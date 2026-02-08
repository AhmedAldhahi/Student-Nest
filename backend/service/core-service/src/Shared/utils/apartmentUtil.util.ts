export class ApartmentUtils {
  private static parseDate(dateStr: string): Date | null {
    if (!dateStr || typeof dateStr !== "string") return null;

    const parts = dateStr.split("-");
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
  }

  static processApartmentStatus(apartments: any[]): any[] {
    const currentDate = new Date();

    return apartments.map((apartment) => {
      if (apartment.endDate) {
        const aptEndDate = this.parseDate(apartment.endDate);

        if (aptEndDate && aptEndDate < currentDate) {
          apartment.isActivated = false;
        }
      }

      let activeLeasesCount = 0;

      if (apartment.leases && Array.isArray(apartment.leases)) {
        activeLeasesCount = apartment.leases.filter((l: any) => {
          return Number(l.LeaseActivationStatus) === 1 || l.isActive === true;
        }).length;
      } else if (apartment.activeLeasesCount !== undefined) {
        activeLeasesCount = Number(apartment.activeLeasesCount);
      }

      const totalBeds = Number(apartment.numberOfBed) || 0;

      if (totalBeds <= activeLeasesCount) {
        apartment.isVisible = false;
      }

      return apartment;
    });
  }
}

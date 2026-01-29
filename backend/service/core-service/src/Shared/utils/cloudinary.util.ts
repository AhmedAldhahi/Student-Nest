export function GetPublic_IdFromUrl(url: string) {
  const regex = /\/v\d+\/(.+?)(\?|$)/;
  const match = url.match(regex);
  if (!(match && match[1])) throw new Error("no public id found !!");

  return match[1].split(".")[0];
}

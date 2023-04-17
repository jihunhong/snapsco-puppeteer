interface Tweet {
  userName: string | null | undefined;
  content: string | null | undefined;
  photoLinks: (string | null)[];
  images: (string | undefined)[];
  datetime: string | null | undefined;
  url: string | null | undefined;
}

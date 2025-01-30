import { Image } from '@queries/image';

export const cdn = (path?: string, format = 'png') => {
  if (process.env.NEXT_PUBLIC_CDN_URL && path) {
    return `${process.env.NEXT_PUBLIC_CDN_URL + path}.${format}?alt=media`;
  }
  return '';
};

export function getImagePath<T = string>(path?: T, format = 'png'): T {
  if (process.env.NEXT_PUBLIC_CDN_URL && path) {
    return `${process.env.NEXT_PUBLIC_CDN_URL + path}.${format}?alt=media` as T;
  }
  return undefined as T;
}

export function getCdnPath(image: Image | null | string) {
  if (typeof image === 'string') return image;
  if (process.env.NEXT_PUBLIC_CDN && image?.filename_disk) {
    return `${process.env.NEXT_PUBLIC_CDN + image.filename_disk}`;
  }
  return '';
}

export function getProfileImage(path?: string | null) {
  return getImagePath(path) ?? '/images/user_default_icon.jpg';
}

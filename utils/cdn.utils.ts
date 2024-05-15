export const googleCdn = (path: string) => {
  return (
    'https://firebasestorage.googleapis.com/v0/b/' +
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET +
    '/o/' +
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_PATH +
    '%2F' +
    path +
    '.png?alt=media'
  )
}

import download from 'download-git-repo';

interface Options {
  clone?: boolean;
}

export async function downloadGitRepo(source: string, path: string, options?: Options) {
  await new Promise<void>((resolve, reject) => {
    download(source, path, options, (err: any) => {
      if (err) {
        reject(new Error(err));
      } else {
        resolve();
      }
    });
  });
}

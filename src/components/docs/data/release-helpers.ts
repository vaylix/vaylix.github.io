export type ReleaseAsset = {
  label: string;
  target: string;
  arch: string;
  format: string;
  href: string;
  icon: 'linux' | 'macos' | 'windows';
};

export type ReleaseEntry = {
  version: string;
  date: string;
  notesHref: string;
  assets: ReleaseAsset[];
};

type VersionedRelease = {
  version: string;
  date: string;
};

function releaseTag(version: string): string {
  return version.startsWith('v') ? version : `v${version}`;
}

function assetHref(
  version: string,
  target: 'server' | 'client',
  suffix: string,
): string {
  const tag = releaseTag(version);
  return `https://github.com/vaylix/vaylix/releases/download/${tag}/vaylix-${target}-${tag}-${suffix}`;
}

function releaseAssets(version: string): ReleaseAsset[] {
  return [
    {
      label: 'Linux',
      target: 'Server',
      arch: 'x86_64',
      format: '.tar.gz',
      href: assetHref(version, 'server', 'linux-x86_64.tar.gz'),
      icon: 'linux',
    },
    {
      label: 'Linux',
      target: 'Server',
      arch: 'aarch64',
      format: '.tar.gz',
      href: assetHref(version, 'server', 'linux-aarch64.tar.gz'),
      icon: 'linux',
    },
    {
      label: 'macOS',
      target: 'Server',
      arch: 'Apple Silicon',
      format: '.tar.gz',
      href: assetHref(version, 'server', 'macos-aarch64.tar.gz'),
      icon: 'macos',
    },
    {
      label: 'Windows',
      target: 'Server',
      arch: 'x86_64',
      format: '.zip',
      href: assetHref(version, 'server', 'windows-x86_64.zip'),
      icon: 'windows',
    },
    {
      label: 'Linux',
      target: 'Client',
      arch: 'x86_64',
      format: '.tar.gz',
      href: assetHref(version, 'client', 'linux-x86_64.tar.gz'),
      icon: 'linux',
    },
    {
      label: 'Linux',
      target: 'Client',
      arch: 'aarch64',
      format: '.tar.gz',
      href: assetHref(version, 'client', 'linux-aarch64.tar.gz'),
      icon: 'linux',
    },
    {
      label: 'macOS',
      target: 'Client',
      arch: 'Apple Silicon',
      format: '.tar.gz',
      href: assetHref(version, 'client', 'macos-aarch64.tar.gz'),
      icon: 'macos',
    },
    {
      label: 'Windows',
      target: 'Client',
      arch: 'x86_64',
      format: '.zip',
      href: assetHref(version, 'client', 'windows-x86_64.zip'),
      icon: 'windows',
    },
  ];
}

export function createReleaseEntry({
  version,
  date,
}: VersionedRelease): ReleaseEntry {
  const tag = releaseTag(version);
  return {
    version: tag,
    date,
    notesHref: `https://github.com/vaylix/vaylix/releases/tag/${tag}`,
    assets: releaseAssets(tag),
  };
}

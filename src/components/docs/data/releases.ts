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

export const releases: ReleaseEntry[] = [
  {
    version: 'v0.2.0',
    date: '2026-05-29',
    notesHref: 'https://github.com/vaylix/vaylix/releases/tag/v0.2.0',
    assets: [
      {
        label: 'Linux',
        target: 'Server',
        arch: 'x86_64',
        format: '.tar.gz',
        href: 'https://github.com/vaylix/vaylix/releases/download/v0.2.0/vaylix-server-v0.2.0-linux-x86_64.tar.gz',
        icon: 'linux',
      },
      {
        label: 'Linux',
        target: 'Server',
        arch: 'aarch64',
        format: '.tar.gz',
        href: 'https://github.com/vaylix/vaylix/releases/download/v0.2.0/vaylix-server-v0.2.0-linux-aarch64.tar.gz',
        icon: 'linux',
      },
      {
        label: 'macOS',
        target: 'Server',
        arch: 'Apple Silicon',
        format: '.tar.gz',
        href: 'https://github.com/vaylix/vaylix/releases/download/v0.2.0/vaylix-server-v0.2.0-macos-aarch64.tar.gz',
        icon: 'macos',
      },
      {
        label: 'Windows',
        target: 'Server',
        arch: 'x86_64',
        format: '.zip',
        href: 'https://github.com/vaylix/vaylix/releases/download/v0.2.0/vaylix-server-v0.2.0-windows-x86_64.zip',
        icon: 'windows',
      },
      {
        label: 'Linux',
        target: 'Client',
        arch: 'x86_64',
        format: '.tar.gz',
        href: 'https://github.com/vaylix/vaylix/releases/download/v0.2.0/vaylix-client-v0.2.0-linux-x86_64.tar.gz',
        icon: 'linux',
      },
      {
        label: 'Linux',
        target: 'Client',
        arch: 'aarch64',
        format: '.tar.gz',
        href: 'https://github.com/vaylix/vaylix/releases/download/v0.2.0/vaylix-client-v0.2.0-linux-aarch64.tar.gz',
        icon: 'linux',
      },
      {
        label: 'macOS',
        target: 'Client',
        arch: 'Apple Silicon',
        format: '.tar.gz',
        href: 'https://github.com/vaylix/vaylix/releases/download/v0.2.0/vaylix-client-v0.2.0-macos-aarch64.tar.gz',
        icon: 'macos',
      },
      {
        label: 'Windows',
        target: 'Client',
        arch: 'x86_64',
        format: '.zip',
        href: 'https://github.com/vaylix/vaylix/releases/download/v0.2.0/vaylix-client-v0.2.0-windows-x86_64.zip',
        icon: 'windows',
      },
    ],
  },
  {
    version: 'v0.1.0',
    date: '2026-05-27',
    notesHref: 'https://github.com/vaylix/vaylix/releases/tag/v0.1.0',
    assets: [
      {
        label: 'Linux',
        target: 'Server',
        arch: 'x86_64',
        format: '.tar.gz',
        href: 'https://github.com/vaylix/vaylix/releases/download/v0.1.0/vaylix-server-v0.1.0-linux-x86_64.tar.gz',
        icon: 'linux',
      },
      {
        label: 'Linux',
        target: 'Server',
        arch: 'aarch64',
        format: '.tar.gz',
        href: 'https://github.com/vaylix/vaylix/releases/download/v0.1.0/vaylix-server-v0.1.0-linux-aarch64.tar.gz',
        icon: 'linux',
      },
      {
        label: 'macOS',
        target: 'Server',
        arch: 'Apple Silicon',
        format: '.tar.gz',
        href: 'https://github.com/vaylix/vaylix/releases/download/v0.1.0/vaylix-server-v0.1.0-macos-aarch64.tar.gz',
        icon: 'macos',
      },
      {
        label: 'Windows',
        target: 'Server',
        arch: 'x86_64',
        format: '.zip',
        href: 'https://github.com/vaylix/vaylix/releases/download/v0.1.0/vaylix-server-v0.1.0-windows-x86_64.zip',
        icon: 'windows',
      },
      {
        label: 'Linux',
        target: 'Client',
        arch: 'x86_64',
        format: '.tar.gz',
        href: 'https://github.com/vaylix/vaylix/releases/download/v0.1.0/vaylix-client-v0.1.0-linux-x86_64.tar.gz',
        icon: 'linux',
      },
      {
        label: 'Linux',
        target: 'Client',
        arch: 'aarch64',
        format: '.tar.gz',
        href: 'https://github.com/vaylix/vaylix/releases/download/v0.1.0/vaylix-client-v0.1.0-linux-aarch64.tar.gz',
        icon: 'linux',
      },
      {
        label: 'macOS',
        target: 'Client',
        arch: 'Apple Silicon',
        format: '.tar.gz',
        href: 'https://github.com/vaylix/vaylix/releases/download/v0.1.0/vaylix-client-v0.1.0-macos-aarch64.tar.gz',
        icon: 'macos',
      },
      {
        label: 'Windows',
        target: 'Client',
        arch: 'x86_64',
        format: '.zip',
        href: 'https://github.com/vaylix/vaylix/releases/download/v0.1.0/vaylix-client-v0.1.0-windows-x86_64.zip',
        icon: 'windows',
      },
    ],
  },
];

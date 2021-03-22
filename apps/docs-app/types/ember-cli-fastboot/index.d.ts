declare module 'ember-cli-fastboot/services/fastboot' {
  import Service from '@ember/service';

  export default class FastBootService extends Service {
    isFastBoot: boolean;

    request: {
      host: string;
    };

    shoebox: {
      retrieve(key: string): unknown;
      put(key: string, data: unknown): void;
    };
  }
}

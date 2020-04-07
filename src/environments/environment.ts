// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  LOGGED_OUT_USERNAME_LABEL: 'Log in to save outfits.',
  LOGGED_IN_USERNAME_LABEL: 'Logged in as ',
  MENU_TOGGLE_LABEL: 'Unequipped items will be sent to the ',
  SHAMELESS_PLUG: 'you can find me on steam! ',
  SHAMELESS_PLUG_ID: '76561198276048723',
  SHAMELESS_PLUG_USERNAME: 'cedric401',
  BUNGIE_CLIENT_ID: '32372',
  BUNGIE_AUTHORIZATION_RESPONSE_TYPE: 'code',
  CHARACTER_API_URL: 'http://localhost:3000/api/characters',
  BUNGIE_AUTHORIZATION_ENDPOINT: 'https://www.bungie.net/en/oauth/authorize'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

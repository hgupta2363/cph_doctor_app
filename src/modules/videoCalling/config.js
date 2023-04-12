// from:  https://github.com/jitsi/jitsi-meet/blob/master/config.js
/* eslint-disable comma-dangle, no-unused-vars, no-var, prefer-template, vars-on-top */

/*
 * NOTE: If you add a new option please remember to document it here:
 * https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-configuration
 */

var config = {
  // Connection
  //

  hosts: {
    // XMPP domain.
    domain: 'jitsi-meet.example.com',

    // When using authentication, domain for guest users.
    // anonymousdomain: 'guest.example.com',

    // Domain for authenticated users. Defaults to <domain>.
    // authdomain: 'jitsi-meet.example.com',

    // Focus component domain. Defaults to focus.<domain>.
    // focus: 'focus.jitsi-meet.example.com',

    // XMPP MUC domain. FIXME: use XEP-0030 to discover it.
    // muc: "conference." + subdomain + "jitsi-meet.example.com"
  },

  // BOSH URL. FIXME: use XEP-0156 to discover it.
  // bosh: "//jitsi-meet.example.com/" + subdir + "http-bind",

  // Websocket URL
  // websocket: 'wss://jitsi-meet.example.com/' + subdir + 'xmpp-websocket',

  // The real JID of focus participant - can be overridden here
  // Do not change username - FIXME: Make focus username configurable
  // https://github.com/jitsi/jitsi-meet/issues/7376
  // focusUserJid: 'focus@auth.jitsi-meet.example.com',

  // Testing / experimental features.
  //

  // Feature Flags.
  flags: {
    receiveMultipleVideoStreams: true,
  },

  // screenshotCapture : {
  //      Enables the screensharing capture feature.
  //      enabled: false,
  //
  //      The mode for the screenshot capture feature.
  //      Can be either 'recording' - screensharing screenshots are taken
  //      only when the recording is also on,
  //      or 'always' - screensharing screenshots are always taken.
  //      mode: 'recording',
  // }
  enableNoAudioDetection: true,

  enableNoisyMicDetection: true,

  // Recording

  // DEPRECATED. Use recordingService.enabled instead.
  // fileRecordingsEnabled: false,

  // Enable the dropbox integration.
  // dropbox: {
  //     appKey: '<APP_KEY>', // Specify your app key here.
  //     // A URL to redirect the user to, after authenticating
  //     // by default uses:
  //     // 'https://jitsi-meet.example.com/static/oauth.html'
  //     redirectURI:
  //          'https://jitsi-meet.example.com/subfolder/static/oauth.html',
  // },

  // Local recording configuration.
  // localRecording: {
  //     // Whether to disable local recording or not.
  //     disable: false,

  //     // Whether to notify all participants when a participant is recording locally.
  //     notifyAllParticipants: false,

  //     // Whether to disable the self recording feature (only local participant streams).
  //     disableSelfRecording: false,
  // },

  // Default value for the channel "last N" attribute. -1 for unlimited.
  channelLastN: -1,
  enableWelcomePage: true,

  // Enabling the close page will ignore the welcome page redirection when
  // a call is hangup.
  // enableClosePage: false,

  // Enables calendar integration, depends on googleApiApplicationClientID
  // and microsoftApiApplicationClientID
  // enableCalendarIntegration: false,

  // Configs for prejoin page.
  prejoinConfig: {
    // When 'true', it shows an intermediate page before joining, where the user can configure their devices.
    // This replaces `prejoinPageEnabled`.
    enabled: true,
    // Hides the participant name editing field in the prejoin screen.
    // If requireDisplayName is also set as true, a name should still be provided through
    // either the jwt or the userInfo from the iframe api init object in order for this to have an effect.
    hideDisplayName: false,
    // List of buttons to hide from the extra join options dropdown.
    hideExtraJoinButtons: ['no-audio', 'by-phone'],
  },

  // toolbarButtons: [
  //    'camera',
  //    'chat',
  //    'closedcaptions',
  //    'desktop',
  //    'dock-iframe',
  //    'download',
  //    'embedmeeting',
  //    'etherpad',
  //    'feedback',
  //    'filmstrip',
  //    'fullscreen',
  //    'hangup',
  //    'help',
  //    'highlight',
  //    'invite',
  //    'linktosalesforce',
  //    'livestreaming',
  //    'microphone',
  //    'noisesuppression',
  //    'participants-pane',
  //    'profile',
  //    'raisehand',
  //    'recording',
  //    'security',
  //    'select-background',
  //    'settings',
  //    'shareaudio',
  //    'sharedvideo',
  //    'shortcuts',
  //    'stats',
  //    'tileview',
  //    'toggle-camera',
  //    'undock-iframe',
  //    'videoquality',
  // ],
};

export default config;

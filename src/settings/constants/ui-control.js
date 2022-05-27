/*
  Sidebar constansts.
  For dashboard, the variant is persistent,
  Where user can interact with sidebar and the content behind. (elevation same for sidebar and content behind the sidebar).
  Default value for sidebar variant in Material UI is temporary.
*/
export const SIDEBAR_VARIANT = {
  PERSISTENT: 'persistent',
  TEMPORARY: 'temporary',
};

// Adding delay (milliseconds) prior to displaying Tab indicator so that it will be shown on load
export const TAB_INDICATOR_DELAY = 400;

// Drawer type
export const DRAWER_TYPE_ERROR = 'error';
export const DRAWER_TYPE_SUCCESS = 'success';

// timer runs every 1 second (1000 ms)
export const COUNTDOWN_TIMER_INTERVAL = 1000;
export const TIMER_DURATION_END = 0;
export const TIMER_DURATION_FORMAT = 'mm:ss';

// modal
export const MODAL_FULLSCREEN_SIZE = 'xs';

// menu appearance & position
export const MENU_SHADOW_ELEVATION = 2;
export const ANCHOR_ORIGIN = {
  vertical: 'bottom',
  horizontal: 'right',
};

export const TRANSFORM_ORIGIN = {
  vertical: 'top',
  horizontal: 'right',
};

export const SWIFT_PAGE_SIZE = 10;

// accordion appearance
export const ACCORDION_SHADOW_ELEVATION = 0;

export const GRID_VARIANT_DEFAULT = 'vertical';

// flexDirection = column
export const GRID_SIZE_VERTICAL = { label: { xs: 12, sm: 4 }, input: { xs: 12, sm: 8 } };
// flexDirection = row
export const GRID_SIZE_HORIZONTAL = { label: { xs: 12, sm: 12 }, input: { xs: 12, sm: 12 } };

// table text-align property
export const ALIGN_RIGHT = 'right';
export const ALIGN_LEFT = 'left';
export const ALIGN_CENTER = 'center';
export const ALIGN_JUSTIFY = 'justify';
export const ALIGN_INHERIT = 'inherit';

// allow leading zeros. ex: 0000123
export const DEFAULT_LEADING_ZERO_REGEX = '(^[0-9])[0-9]*$';

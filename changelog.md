# Changelog

## [0.3.2] - 2020-12-14

### Added

- Location card component
- Locations handler component
- Locations navigation component
- Delete locations method
- Dialogs locales
- Side Drawer Header component
- Side Drawer menu
- Side Drawer button and navigation

### Changed

- Moved Mapbox plugin installation to Map component
- Moved back button handler to MainNavigator page

### Fixed

- Fixed item

### Removed

- Remove item


## [0.3.1] - 2020-12-14

### Added

- Redesign Custom Slider user interface
- Redesign Security Area Menu interface
- Custom Slider component to New Security Area Menu
- LocationList component elevation
- Couchbase
- Add markers from persistent storage at init
- Added Locations list component to select a Location anf fly to

### Changed

- Home page name -> Main
- Locations List component location

### Security

- Resolved "ini" security issue


## [0.3.0] - 2020-12-09

### Added

- Local storage
- Testing
- New security area menu: default color
- New security area menu: radius slider
- New security area menu: opacity slider
- New security area menu: dividers
- User in Security Areas: in & out

### Changed

- Color selected prop

### Fixed

- Fixed item

### Removed

- Remove item


## [0.2.1] - 2020-11-26

### Added

- Circle of security area points validation & normalization
- Security new area handler

### Changed

- Renamed conditional props and methods
- Circle util folder

### Fixed

- Hide the keyboard when press Cancel button
- Reset Text Form's textfield
- The enabled of the geolocation service on init
- Loading Map Wrapper component bug
- Set security area color

### Removed

- Remove item


## [0.2.0] - 2020-11-23

### Added

- New Security Area component
- Color Selector component
- Custom Slider component
- MDSlider installer
- Location title
- View and components test (use internal only)
- User marker onTap method: toggles the new location menu visibility
- Location onTap method: loads new security area menu

### Changed

- MDButton installer

### Fixed

- New security areas position
- Bottom sheet's dynamics components lazy loading
- TextField is not empty

### Removed

- Remove item

## [0.1.5] - 2020-11-18

### Added

- Create user marker without device connection
- Locations API
- Locations page
- Locations Store
- Title prop to First Location Alert component
- Fake page only for tests

### Changed

- Create user's marker method
- Reorder MapWrapper imports by components

### Fixed

- No device connection bug
- Dismiss soft keyboard on cancel
- Keep Alive Text Form component
- Prevent bubling gestures in Bottom App Menu
- Geolocation service issues
- Set locations in map in true coordinates
- setCenter method bug

### Removed

- MapWrappers unused methods

## [0.1.4] - 2020-11-04

### Added

- More texts to locales
- User Marker onTap method to call to new location menu
- User Marker Store
- User Marker API
- User Marker types
- Locations Store
- Locations API
- Locations types

### Changed

- Reorder User Marker & Locations methods
- First Location Alert component name

### Fixed

- Fixed item

### Removed

- Remove generic marker methods & API


## [0.1.3] - 2020-11-02
### Added

- Bottom App bar
- Timeline debugger
- Android permission: FINE_LOCATION
- Nativescript Android permissions plugin
- setOnMapLongClickAction method

### Changed

- Refactored get current user location methods and types

### Fixed

- Polygon options type
- get current user location methods and types


## [0.1.2] - 2020-10-26

### Added

- Custom marker icon
- setMarker method

### Changed

- geocoder icon method
- Refactored marker types
- Updated linter

### Removed

- geocoder icon color option


## [0.1.1] - 2020-10-23

### Added

- New method to set the default marker new coordinates
- Long pressed map gesture method to move default marker
- New definition types
- Android portrait constrain mode
- Add the Application logo to Readme file
- Readme file

### Changed

- Refactored markers logical
- Types file path
- Change types file path
- Change Coordinates interface name to LngLat

### Removed

- Unused methods & props

## [0.1.0] - 2020-10-23

### Added

- A lot of previous work

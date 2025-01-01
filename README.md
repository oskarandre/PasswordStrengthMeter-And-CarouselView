# Password Strength Meter & Carousel View

This is a project for the course TDDC73.

## Overview

This project consists of two main components:
1. **Password Strength Meter**: A tool to evaluate and display the strength of a user's password.
2. **Carousel View**: A React Native component to display a carousel of images.

## Password Strength Meter

The Password Strength Meter evaluates the strength of a password based on various criteria such as length, use of special characters, numbers, and uppercase letters. It provides visual feedback to the user about the strength of their password.

### Features
- Real-time password strength evaluation
- Visual feedback with color indicators
- Customizable strength criteria

## Carousel View

The Carousel View component displays a series of images in a carousel format. Users can navigate through the images using next and previous buttons. The component supports different visual styles and a configurable number of visible items.

### Features
- Circular navigation through images
- Configurable number of visible items
- Support for "round" and "flat" visual styles
- Responsive design

## Setup

To set up the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/passwordChecklist.git
   cd passwordChecklist
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the project:
   ```bash
   npm start
   ```

## Usage

### Password Strength Meter

To use the Password Strength Meter, import the component and include it in your JSX:

```jsx
import PasswordStrengthMeter from './components/PasswordStrengthMeter';

const App = () => (
  <PasswordStrengthMeter length={12} showRequirements={'always'}  />
);
```

You can add or change the following props:

- Minimum length of the password: length (number)             
- Require at least one capital letter: capitalLetter (bool)
- Require at least one numeric character: numeric (bool)
- Require at least one special character: specialCharacter (bool)
- Display the strength of the password in text: displayStrength (bool)
- Display the strength of the password in a bar: displayBar (bool)
- When to show the requirements, 'always', 'never', or 'onFocus': showRequirements (string)
- Use the custom strength meter depending on the criterias selected: ownStrengthAlgorithm (bool)

### Carousel View

To use the Carousel View, import the component and include it in your JSX with the required props:

```jsx
import CarouselView from './components/CarouselView';

const items = [
  { image: require('./assets/image1.jpg') },
  { image: require('./assets/image2.jpg') },
  { image: require('./assets/image3.jpg') },
];

const App = () => (
  <CarouselView items={items} visibleCount={3} visualStyle="round" />
);
```
You can add or change the following props:

- Number of items visible at the same time, defaults to 3: visibleCount (number)
- Style of carousel, either "round" or "flat", defaults to "round": visualStyle(string)

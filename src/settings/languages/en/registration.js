export const registration = {
  slogan: 'Join us and become a Maybank2u user today.',
  container: {
    footerLinkText: 'Register Here',
    title: 'Ready to create an account?',
    footerText: 'Do you have a Maybank account? If no, click',
    initialDescription: 'Before we create your account, let us verify one of your credential below.',
  },
  form: {
    agreement: 'I agree with the ',
    policy: 'Terms & Conditions',
    accountType: {
      accountNumber: 'Account Number',
      creditCard: 'Credit Card',
    },
    accountNumber: {
      label: 'Account number',
      placeholder: 'Ex. 159624555621',
      tooltip: 'Account Number is your Maybank Account Number',
    },
    creditCardNumber: {
      label: 'Credit Card Number',
      expiryLabel: 'Credit Card Expiry',
      placeholder: 'Ex. 1111222233334444',
      tooltip: 'Credit Card Number is your Credit Card Number',
    },
    pin: {
      label: 'PIN',
      placeholder: 'Enter 6-digit PIN number',
      tooltip: {
        account: 'PIN is your Debit Card PIN',
        creditCard: 'PIN is your Credit Card PIN',
      },
    },
    username: {
      label: 'Username',
      placeholder: 'Enter your username',
      tooltip: 'Must contain Alpha Numeric. Maximum length between 6 to 20 characters, allows only "-" and "."',
    },
    password: {
      label: 'Password',
      placeholder: 'Enter your password',
      tooltip: 'Must contain Alpha Numeric. Maximum length between 8 to 20 characters. Lower Uppercase Letter',
    },
    confirmPassword: {
      label: 'Confirmation Password',
      placeholder: 'Re-enter your password',
      tooltip: 'Must be the same with Password',
    },
    email: { label: 'Email', placeholder: 'Your email' },
    mobile: { label: 'Phone Number', placeholder: 'Your phone number' },
  },
  errorMessage: {
    agreement: 'You need to Agree to our Terms & Conditions',
    accountNumber: 'Input Account Number must be 10 digit',
    pin: 'Input PIN must be 6 digit',
    creditCard: 'Input Credit Card Number must be 16 digit',
    expiryMonth: 'Input Credit Card Month of expiration must be 2 digit',
    expiryYear: 'Input Credit Card Year of expiration must be 2 digit',
    usernameLength: 'Input Username must be between 6-20 characters',
    username: 'Must contain Alphanumeric.',
    passwordLength: 'Input password length must be between 8-20 characters',
    password: 'Must contain Alphanumeric and Lower Uppercase Letter',
    confirmPassword: 'Password not identical',
    usernameAsPassword: 'Username and Password cannot be same',
    selectedImage: 'Please select 1 image',
  },
  finalStep: {
    title: 'One more step from creating your account',
    initialDescription: 'Please enter your account Username and Password',
    captchaLabel: 'Please select one of the images below to verify your account',
  },
  modal: {
    completed: "Awesome! you've completed your registration",
    accountActivated: {
      title: 'Register Error',
      contentTitle: "You've already activated your account.",
      description: 'We noticed you are existing Maybank2u user. Please choose an action below to continue.',
    },
  },
};

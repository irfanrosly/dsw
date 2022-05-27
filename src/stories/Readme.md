# How to create stories for Dyno-Web-Shared

1. Go into `/src/stories/dyno-web`

2. Create the component name. For example `Button.stories.jsx`. \
   The format must be`{Component Name}.stories.jsx`

3. Start your stories with the basic template as below :

```javascript
import React from 'react'

// import your component from `/src` folder
import { BasicButton } from '../../Button/BasicButton'

export default {
  title: 'Dyno Web/Button',
  component: BasicButton
}
```

Please make sure the format for the title is as following : \
`Dyno Web/{Component Name}`

e.g

```javascript
 title: 'Dyno Web/TextInput',
```

4. Add the following code into your stories you have created before

```javascript
const Template = (args) => <BasicButton {...args}>{args.label}</BasicButton>

export const Primary = Template.bind({})
```

The above code is the same when you are importing some component into your applications and you use them. The advantage that Storybook provide is when you use the following code, you will have controls to all the props exposed by the component.

For example, for the `BasicButton`, you will get the following controls.

![BasicButton Controls](./assets/BasicButton%20Controls.png)

All the controls can be changed and you can see the changes on the fly.

Below is the result when the controls are changed.

![BasicButton Controls Modified](./assets/BasicButton%20Controls%20Modified.png)

5. The last one would be how to pre-define the props for the components. You can use the following code :

```javascript
Primary.args = {
  label: 'Button'
}
```

You can pre-define any props you want. If no pre-define props are supplied, you will the the UI as per the first image.

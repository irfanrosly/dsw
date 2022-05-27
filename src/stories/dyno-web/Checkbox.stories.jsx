import { color } from "@mui/system";
import React from "react";

import { Checkbox } from "../../Checkbox";

export default {
	title: "Dyno Web/Checkbox",
	component: Checkbox,
};

const Template = (args) => <Checkbox {...args} />

export const Primary = Template.bind({})
Primary.args = {
    label: 'Checkbox'
  }

export const Round = Template.bind({})
Round.args = {
    variant: 'round',
    label: 'Checkbox'
  }
import { color } from "@mui/system";
import React from "react";

import { Link } from "../../Link";

export default {
	title: "Dyno Web/Link",
	component: Link,
};

const Template = (args) => <Link {...args} />

export const Primary = Template.bind({})

Primary.args = {
  label: 'Link'
}
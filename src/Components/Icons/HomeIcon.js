import * as React from "react"
import Svg, { Path } from "react-native-svg"

const HomeIcon = (props) => (
  <Svg
  xmlns="http://www.w3.org/2000/svg"
  width={40}
  height={40}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth={2}
  strokeLinecap="round"
  strokeLinejoin="round"
  className="feather feather-home"
  {...props}
>
  <Path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  <Path d="M9 22V12h6v10" />
</Svg>
)

export default HomeIcon;

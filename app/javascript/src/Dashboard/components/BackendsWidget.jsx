// @flow

import React from 'react'

import { createReactWrapper } from 'utilities/createReactWrapper'

type Props = {
  newBackendPath: string,
  backendsPath: string,
  backends: Array<{
    id: number,
    link: string,
    links: Array<{
      name: string,
      path: string
    }>,
    name: string,
    type: string,
    updated_at: string
  }>
}

const BackendsWidget = (props: Props) => {
  console.log(props)

  return (
    <div>Backends</div>
  )
}

const BackendsWidgetWrapper = (props: Props, containerId: string) => createReactWrapper(<BackendsWidget {...props} />, containerId)

export { BackendsWidgetWrapper }

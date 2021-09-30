import ContentInfo from '@ui/views/labels/detail/ContentInfo'

import React from 'react'
import {mockLabel} from "@src/entities/label";


export function Page() {
  return (
    <>
      {/* @ts-ignore */}
      <ContentInfo label={mockLabel()[0]} />
    </>
  )
}

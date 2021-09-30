import { addReadme } from 'storybook-readme'
import { addDecorator } from '@storybook/react'
addDecorator(addReadme)

import { storiesOf } from '@storybook/react'

// import Introduction from './guide-management/1-introduction.stories.mdx'
// import Contents from './guide-management/Contents.md'
// import Structure from './guide-develop/Structure.md'
// import Commit from './guide-develop/Commit.md'

// storiesOf('for 사용자 / 💡 핵심 용어', module)
//   .addParameters({
//     options: {
//       showPanel: false
//     }
//   })
//   .add('레이블', () => {}, {
//     readme: {
//       content: Contents
//     }
//   })
//   .add('세그먼트', () => {}, {
//     readme: {
//       content: Contents
//     }
//   })
//   .add('스케쥴', () => {}, {
//     readme: {
//       content: Contents
//     }
//   })
//   .add('세그먼트', () => {}, {
//     readme: {
//       content: Contents
//     }
//   })
//   .add('프로젝트 아키텍쳐', () => {}, {
//     readme: {
//       content: Contents
//     }
//   })

// storiesOf('for 운영자 /😿 운영 가이드', module)
//   .addParameters({
//     options: {
//       showPanel: false
//     }
//   })
//   .add('소개', () => {}, {
//     readme: {
//       content: Introduction
//     }
//   })
//   .add('권한 신청', () => {}, {
//     readme: {
//       content: Contents
//     }
//   })
//   .add('레이블', () => {}, {
//     readme: {
//       content: Contents
//     }
//   })
//   .add('세그먼트', () => {}, {
//     readme: {
//       content: Contents
//     }
//   })
//   .add('프로젝트 아키텍쳐', () => {}, {
//     readme: {
//       content: Contents
//     }
//   })

// storiesOf('for 운영자 /🧐 개발 가이드', module)
//   // .addParameters({
//   //   options: {
//   //     showPanel: false,
//   //   },
//   // })
//   .add('설치', () => {}, {
//     readme: {
//       content: Contents
//     }
//   })
//   .add('세팅', () => {}, {
//     readme: {
//       content: Contents
//     }
//   })
//   .add('실행 및 빌드', () => {}, {
//     readme: {
//       content: Contents
//     }
//   })
//   .add('프로젝트 구조', () => {}, {
//     readme: {
//       content: Structure
//     }
//   })
//   .add('컴포넌트 설계', () => {}, {
//     readme: {
//       content: Contents
//     }
//   })
//   .add('코드스타일', () => {}, {
//     readme: {
//       content: Contents
//     }
//   })
//   .add('Git 규칙', () => {}, {
//     readme: {
//       content: Commit
//     }
//   })
//   .add('버전 관리', () => {}, {
//     readme: {
//       content: Contents
//     }
//   })
//   .add('배포', () => {}, {
//     readme: {
//       content: Contents
//     }
//   })

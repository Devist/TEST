import Avatar from '@core-components/avatar'
import { User, GitHub } from 'react-feather'

export default {
  title: '컴포넌트(vuexy)/🍎 atoms/Avatar',
  component: Avatar,
  argTypes: {
    color: {
      options: [
        'primary',
        'secondary',
        'success',
        'dnager',
        'warning',
        'info',
        'light-primary',
        'light-secondary',
        'light-success',
        'light-danger',
        'light-warning',
        'light-info'
      ],
      control: { type: 'select' }
    },
    icon: {
      options: [null, 'user', 'github'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', '', 'lg', 'xl'],
      control: { type: 'select' }
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          '아바타는 레이블 순위,유저 아이콘 표시 등에 사용됩니다. ' +
          "<br/> ```import Avatar from ''@core-components/avatar' ```가 필요합니다.  "
      }
    }
  }
}

const getIconComponent = (icon) => {
  switch (icon) {
    case 'user':
      return <User size={14} />
    case 'github':
      return <GitHub size={14} />
    case null:
      return null
    default:
      return <User size={14} />
  }
}
const TemplateWithIcon = ({ icon, ...args }) => {
  const iconComponent = getIconComponent(icon)
  return <Avatar icon={iconComponent} {...args} />
}

export const 텍스트형 = TemplateWithIcon.bind({})
텍스트형.args = { color: 'primary', content: '1', icon: null }

export const 아이콘형 = TemplateWithIcon.bind({})

아이콘형.args = { color: 'light-secondary', icon: 'user', size: '' }

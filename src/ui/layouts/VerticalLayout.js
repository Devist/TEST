// !Do not remove the Layout import
import Layout from '@src/ui/@core/layouts/VerticalLayout'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const VerticalLayout = (props) => <Layout {...props}>{props.children}</Layout>

export default VerticalLayout

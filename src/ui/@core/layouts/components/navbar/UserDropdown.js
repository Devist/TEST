// ** React Imports
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@core-components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'

import { observer } from 'mobx-react'

// ** Third Party Components
import {
  Alert,
  Button,
  Badge,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown
} from 'reactstrap'

import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power
} from 'react-feather'

// ** Default Avatar Image
import defaultAvatar from '@ui/assets/images/portrait/small/avatar-s-11.jpg'
import { useStores } from '@src/stores'

const UserDropdown = observer(() => {
  // ** Store Vars
  const dispatch = useDispatch()

  const { userStore } = useStores()

  // ** State
  const [userData, setUserData] = useState(userStore.info)

  // 정보 모달
  const [openModal, setOpenModal] = useState(false)

  //** ComponentDidMount
  useEffect(() => {
    // if (isUserLoggedIn() !== null) {
    setUserData(userStore.info)

    // }
  }, [])

  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar

  return (
    <>
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle
          href="/"
          tag="a"
          className="nav-link dropdown-user-link"
          onClick={(e) => e.preventDefault()}>
          <div className="user-nav d-sm-flex d-none">
            <span className="user-name font-weight-bold">{userStore.name}</span>
            <span className="user-status text-capitalize">{userStore.role}</span>
          </div>
          <div className="bg-light-primary rounded-circle mr-75">
            <User color="#7367F0" size={24} className="m-50" />
          </div>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <span className="align-middle font-small-3">
              {userStore.info.email.split('@')[0]}@
            </span>
            <br />
            <span className="align-middle font-small-3">
              {userStore.info.email.split('@')[1]}
            </span>
          </DropdownItem>

          <DropdownItem divider />

          <DropdownItem
            tag={Link}
            to="#"
            onClick={(e) => {
              e.preventDefault()
              setOpenModal(true)
            }}>
            <User size={14} className="mr-75" />
            <span className="align-middle">정보 및 게임권한</span>
          </DropdownItem>

          <DropdownItem tag={Link} to="/login" onClick={() => dispatch(handleLogout())}>
            <Power size={14} className="mr-75" />
            <span className="align-middle">로그아웃</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <Modal
        isOpen={openModal}
        toggle={() => setOpenModal(!openModal)}
        className="modal-dialog-centered"
        fade={false}>
        <ModalHeader toggle={() => setOpenModal(!openModal)}>
          사용자 정보 및 게임 권한
        </ModalHeader>
        <ModalBody>
          <div className="font-weight-bolder">
            {userStore.name} ({userStore.info.department})
          </div>
          <div className="my-1">{userStore.info.email}</div>
          <hr />
          <div>나의 게임 목록</div>
          <Alert className="mt-1" color="info">
            <div className="alert-body overflow-auto" style={{ maxHeight: 300 }}>
              {userStore.info.games.map((game) => {
                return (
                  <Badge color="info" className="mr-1 mb-1" key={'badge' + game.code}>
                    {game.name}
                  </Badge>
                )
              })}
            </div>
          </Alert>
        </ModalBody>
      </Modal>
    </>
  )
})

export default UserDropdown

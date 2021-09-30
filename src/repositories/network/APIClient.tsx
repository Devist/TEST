/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { IApiResponse } from './APIResponse'
import { APIRequest } from './APIRequest'
import { IApiError } from './APIError'
import { toast } from 'react-toastify'
import Avatar from '@core-components/avatar'

import { Bell, X } from 'react-feather'
import React from 'react'

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT'
}

export const ToastComponent = ({ title, icon, color, message }: any) => (
  <>
    <div className="toastify-header pb-0">
      <div className="title-wrapper">
        <Avatar size="sm" color={color} icon={icon} />
        <h6 className="toast-title">{title}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>{message}</span>
    </div>
  </>
)

export class APIClient {
  static shared = new APIClient()

  // URL 설정
  baseDomain = process.env.REACT_APP_BASE_API_URL
  baseURL = `${this.baseDomain}`

  // Timeout 설정
  timeout: number = 15 * 1000

  request<T extends IApiResponse>(request: APIRequest<T>): Promise<T> {
    const isRead = request.method === HTTPMethod.GET

    // console.log(`=======================================`)
    // console.log(`🎉 API 요청 : ${request.path}`)
    // console.log('🎉 params :', request.params)

    return new Promise<T>((resolve, reject) => {
      axios
        .request({
          url: request.path,
          method: request.method,
          params: isRead && request.params,
          data: !isRead && request.params,
          withCredentials: true,
          timeout: this.timeout,
          baseURL: request.baseURL || this.baseURL,
          // headers: this.createHeaders(!isRead && request.path.includes('auth/')),
          headers: request.path.includes('data/')
            ? APIClient.createHeaders(request.header)
            : APIClient.createHeaders()
        })
        .then((result) => {
          // console.log(request)
          const response = request.parse
            ? request.parse(result)
            : APIClient.parse<T>(result)

          // 디버깅용
          console.log('🎉 API 응답 :', response)
          console.log(`=======================================`)

          resolve(response)
        })
        .catch((err) => {
          const apiError = APIClient.normalizeError(err)
          if (apiError.code === 500) {
            toast.error(
              <ToastComponent
                title="500 에러"
                color="danger"
                icon={<X />}
                message="죄송합니다. 서버 내부 에러가 발생했습니다."
              />,
              {
                autoClose: 2000,
                hideProgressBar: true,
                closeButton: false
              }
            )
          } else if (apiError.code === 404) {
            toast.warn(
              <ToastComponent
                title="존재하지 않는 API"
                color="warning"
                icon={<Bell />}
                message="존재하지 않는 API가 호출되어 일부 정보가 표시되지 않을 수 있습니다. 관리자에게 문의하세요."
              />,
              {
                autoClose: 4000,
                hideProgressBar: true,
                closeButton: false
              }
            )
          }
          reject(apiError)
        })
    })
  }

  // Default parser
  private static parse<T extends IApiResponse>(data: any): T {
    return data
  }

  // Convert axios error into APIError
  private static normalizeError(error: any): IApiError {
    return {
      code: error.response && error.response.status,
      message: error.message,
      raw: error
    }
  }

  // Create headers
  private static createHeaders(header: any = null): any {
    if (header) {
      return header
    }
    return {
      'Content-Type': 'application/json'
    }
  }

  // private toFormData(form: any) {
  //   const formdata = new FormData()

  //   // formdata에 각각의 input의 value를 추가
  //   for (const attr in form) {
  //     console.log("attr", attr)
  //     console.log("attr", form[attr])
  //     formdata.append(attr, form[attr])
  //   }
  //   console.log("formdata:", formdata)
  //   return formdata
  // }
}

"use client"
import React from "react";
import Image from "next/image";
import { useAuth } from '../../app/context/auth-context';
import Router from "next/navigation";
import { useRouter } from "next/navigation";

export default function Menu() {

    const Router = useRouter()
    const svgPathData = 'F:/Sami/Work/PTSL/FabricShop/Implementation/fabricshop_admin/public/images/history.svg'
    
  return (

    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l mt-2  left-0">
      {/* <a href="#">
        <Image
          src="/images/menu.png"
          alt="FabricShop"
          width={50}
          height={40}
          className="w-25 h-30"
          style={{height:"auto", width: "auto"}}
        />
      </a> */}

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-6">
          <div className="space-y-3">
            <label className="px-3 text-xs text-gray-500 uppercase">analytics</label>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              href="/Dashboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24"><path d="M3 13h8V3H3zm0 8h8v-6H3zm10 0h8V11h-8zm0-18v6h8V3z"/></svg>

              <span className="mx-2 text-sm font-medium">Dashboard</span>
            </a>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              href="/sales"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              </svg>

              <span className="mx-2 text-sm font-medium">Sales</span>
            </a>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              href="/order-history"
            >
              
              <img className="h-5 w-5" src="../images/history.svg" alt="" />

              <span className="mx-2 text-sm font-medium">Order History</span>
            </a>

            


          </div>
          
          <div className="space-y-3">
            <label className="px-3 text-xs text-gray-500 uppercase">content</label>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              href="/brand-list"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>

              <span className="mx-2 text-sm font-medium">Brands</span>
            </a>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              href="/color-list"
            >
              <svg version="1.1" id="designs" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 32 32" stroke="currentColor">

<path className="sketchy_een" d="M28.395,16.137c-0.074-0.894-0.433-1.698-0.793-2.507c-0.284-0.638-0.621-1.25-1.091-1.771
	c-0.217-0.243-0.461-0.487-0.765-0.619c-0.195-0.083-0.383-0.158-0.588-0.212c-0.35-0.092-0.717-0.124-1.077-0.151
	c-0.641-0.046-1.279-0.072-1.923-0.074c-0.343-0.002-0.684-0.002-1.027,0.002c-0.295,0.003-0.586,0.01-0.878-0.012
	c-0.092-0.019-0.181-0.041-0.271-0.071c-0.013-0.007-0.025-0.014-0.038-0.022c-0.013-0.013-0.025-0.026-0.037-0.039
	c-0.014-0.024-0.028-0.048-0.041-0.073c-0.028-0.085-0.052-0.17-0.072-0.258c-0.002-0.039-0.003-0.077-0.002-0.117
	c0.013-0.066,0.03-0.13,0.051-0.194c0.072-0.14,0.156-0.269,0.248-0.398c0.241-0.295,0.498-0.577,0.773-0.84
	c0.166-0.161,0.334-0.319,0.494-0.485c0.194-0.201,0.359-0.437,0.514-0.667c0.236-0.352,0.424-0.728,0.56-1.128
	c0.116-0.332,0.135-0.669,0.114-1.018c-0.009-0.142-0.05-0.276-0.118-0.392c-0.039-0.1-0.098-0.192-0.179-0.27
	c-0.138-0.131-0.277-0.264-0.424-0.385c-0.111-0.092-0.223-0.186-0.341-0.269c-0.208-0.147-0.437-0.241-0.673-0.333
	C20.454,3.69,20.074,3.578,19.7,3.48c-0.37-0.098-0.752-0.153-1.128-0.216c-0.448-0.074-0.9-0.129-1.353-0.177
	c-0.4-0.044-0.8-0.068-1.202-0.077C15.812,3.005,15.606,3,15.401,3c-0.186,0-0.373,0.004-0.558,0.017
	c-0.428,0.03-0.855,0.096-1.281,0.166c-0.367,0.059-0.73,0.144-1.082,0.269C10.897,4.015,9.502,4.959,8.28,6.102
	C7.996,6.367,7.714,6.64,7.45,6.926c-0.278,0.3-0.533,0.619-0.782,0.94c-0.52,0.669-0.973,1.383-1.37,2.129
	c-0.19,0.356-0.35,0.726-0.507,1.097c-0.166,0.393-0.319,0.785-0.439,1.193c-0.223,0.765-0.396,1.541-0.533,2.325
	c-0.142,0.815-0.229,1.626-0.243,2.454c-0.007,0.389-0.004,0.781,0.041,1.169c0.053,0.452,0.14,0.887,0.249,1.329
	c0.203,0.82,0.529,1.632,0.944,2.367c0.385,0.678,0.763,1.372,1.211,2.011c0.243,0.347,0.496,0.693,0.791,0.997
	c0.289,0.295,0.579,0.59,0.876,0.876c0.601,0.575,1.285,1.08,2.004,1.495c0.717,0.411,1.421,0.822,2.212,1.075
	c0.787,0.253,1.591,0.37,2.409,0.468c1.633,0.19,3.305,0.236,4.927-0.068c0.771-0.144,1.519-0.36,2.245-0.654
	c0.8-0.321,1.561-0.691,2.288-1.154c0.737-0.47,1.43-1.043,1.956-1.747c0.24-0.323,0.444-0.664,0.642-1.014
	c0.19-0.336,0.393-0.664,0.571-1.003c0.203-0.383,0.348-0.796,0.501-1.2c0.144-0.378,0.269-0.759,0.38-1.148
	c0.214-0.765,0.374-1.536,0.485-2.323C28.419,17.748,28.459,16.931,28.395,16.137z M26.832,18.414
	c-0.096,0.62-0.222,1.231-0.398,1.834c-0.098,0.336-0.192,0.673-0.317,0.997c-0.107,0.28-0.222,0.557-0.338,0.834
	c-0.186,0.411-0.423,0.79-0.652,1.18c-0.223,0.376-0.444,0.751-0.7,1.105c-0.267,0.315-0.56,0.596-0.876,0.861
	c-0.71,0.526-1.471,0.949-2.278,1.304c-0.483,0.198-0.968,0.385-1.474,0.519c-0.494,0.13-0.987,0.243-1.491,0.322
	c-0.346,0.042-0.696,0.082-1.045,0.086c-0.409,0.004-0.82,0.002-1.23-0.019c-0.781-0.04-1.556-0.112-2.332-0.209
	c-0.626-0.101-1.237-0.261-1.828-0.488c-0.439-0.201-0.859-0.431-1.278-0.671c-0.214-0.122-0.43-0.243-0.64-0.374
	c-0.188-0.119-0.368-0.25-0.547-0.383c-0.35-0.287-0.676-0.594-0.991-0.92c-0.315-0.326-0.626-0.652-0.909-1.006
	c-0.326-0.446-0.618-0.908-0.906-1.379c-0.317-0.513-0.621-1.029-0.866-1.578c-0.127-0.334-0.253-0.669-0.347-1.013
	c-0.097-0.364-0.182-0.73-0.245-1.102c-0.089-0.934-0.053-1.888,0.047-2.82c0.185-1.287,0.464-2.564,0.945-3.774
	c0.221-0.513,0.457-1.022,0.747-1.498C7.209,9.681,7.568,9.169,7.948,8.67c0.344-0.432,0.699-0.85,1.095-1.239
	c0.401-0.393,0.813-0.766,1.254-1.114c0.598-0.455,1.252-0.82,1.934-1.128c0.393-0.154,0.79-0.296,1.2-0.399
	c0.378-0.094,0.759-0.166,1.144-0.228c0.919-0.108,1.848-0.064,2.767,0.045c0.505,0.072,1.009,0.158,1.509,0.262
	c0.5,0.104,0.979,0.251,1.455,0.435c0.093,0.044,0.182,0.093,0.269,0.15c0.254,0.166,0.498,0.328,0.392,0.68
	c-0.082,0.272-0.359,0.574-0.539,0.794c-0.197,0.242-0.41,0.463-0.642,0.68c-0.251,0.236-0.47,0.494-0.686,0.763
	c-0.337,0.422-0.642,0.833-0.789,1.364c-0.118,0.428-0.057,0.874,0.083,1.285c0.181,0.533,0.549,0.961,1.089,1.147
	c0.463,0.162,0.953,0.158,1.436,0.151c0.396-0.007,0.795-0.004,1.191,0.002c0.756,0.013,1.504,0.081,2.256,0.144
	c0.023,0.002,0.045,0.005,0.068,0.007c0.197,0.032,0.388,0.078,0.576,0.141c0.053,0.026,0.104,0.054,0.156,0.086
	c0.162,0.14,0.306,0.297,0.442,0.463c0.35,0.499,0.603,1.053,0.846,1.612c0.172,0.428,0.319,0.858,0.399,1.315
	c0.038,0.377,0.046,0.754,0.046,1.132C26.896,17.618,26.879,18.016,26.832,18.414z M9.856,14.649
	c0.302,0.085,0.625,0.051,0.929-0.006c0.223-0.042,0.437-0.16,0.64-0.262c0.428-0.214,0.761-0.536,1.019-0.935
	c0.23-0.358,0.365-0.772,0.411-1.193c0.041-0.365-0.046-0.71-0.199-1.038c-0.066-0.142-0.136-0.251-0.236-0.378
	c-0.114-0.14-0.254-0.24-0.396-0.35c-0.09-0.052-0.186-0.085-0.288-0.097c-0.121-0.08-0.266-0.127-0.42-0.135
	c-0.071-0.004-0.142-0.005-0.214-0.005c-0.544,0-1.093,0.112-1.545,0.428c-0.253,0.177-0.463,0.385-0.64,0.636
	c-0.149,0.208-0.249,0.444-0.328,0.687c-0.068,0.218-0.087,0.457-0.116,0.682c-0.02,0.155,0.018,0.323,0.048,0.474
	c0.028,0.155,0.085,0.31,0.151,0.452C8.905,14.096,9.333,14.503,9.856,14.649z M9.996,12.58c0.019-0.107,0.045-0.209,0.079-0.31
	c0.032-0.062,0.067-0.121,0.105-0.178c0.047-0.052,0.095-0.101,0.146-0.148c0.056-0.037,0.113-0.07,0.173-0.102
	c0.087-0.029,0.175-0.052,0.265-0.072c0.144-0.011,0.287-0.01,0.432-0.002c0.006,0.006,0.012,0.012,0.018,0.018
	c0.009,0.016,0.018,0.033,0.027,0.049c0.027,0.078,0.049,0.154,0.066,0.234c0.001,0.037,0,0.073-0.001,0.11
	c-0.021,0.106-0.048,0.209-0.082,0.313c-0.058,0.124-0.121,0.243-0.198,0.358c-0.043,0.048-0.089,0.093-0.137,0.136
	c-0.102,0.067-0.209,0.124-0.319,0.176c-0.057,0.019-0.114,0.036-0.173,0.05c-0.045,0.002-0.09,0.002-0.135,0.001
	c-0.015-0.004-0.029-0.007-0.043-0.012l-0.001,0c-0.035-0.033-0.069-0.068-0.101-0.105c-0.03-0.045-0.058-0.09-0.084-0.138
	c-0.018-0.062-0.035-0.124-0.049-0.187C9.985,12.706,9.99,12.643,9.996,12.58z M12.265,17.28c-0.152-0.139-0.346-0.214-0.539-0.214
	c-0.153,0-0.305,0.047-0.436,0.146c-0.084-0.033-0.175-0.052-0.27-0.052c-0.144,0-0.286,0.02-0.426,0.046
	c-0.087,0.022-0.171,0.054-0.251,0.096c-0.116,0.05-0.219,0.107-0.326,0.175c-0.26,0.164-0.52,0.365-0.712,0.603
	c-0.229,0.284-0.413,0.607-0.488,0.964c-0.046,0.216-0.057,0.439-0.061,0.658c-0.009,0.645,0.245,1.329,0.789,1.701
	c0.299,0.207,0.63,0.284,0.988,0.31c0.184,0.014,0.37-0.009,0.555-0.035c0.243-0.034,0.441-0.075,0.669-0.175
	c0.221-0.098,0.413-0.249,0.59-0.411c0.066-0.061,0.12-0.136,0.175-0.207c0.098-0.123,0.182-0.238,0.253-0.38
	c0.087-0.175,0.157-0.37,0.199-0.562c0.022-0.101,0.042-0.205,0.061-0.306c0.05-0.297,0.063-0.562,0.015-0.857
	C12.963,18.217,12.689,17.666,12.265,17.28z M11.53,19.268c-0.031,0.183-0.071,0.364-0.13,0.54
	c-0.024,0.044-0.049,0.087-0.077,0.128c-0.052,0.059-0.107,0.113-0.166,0.165c-0.037,0.024-0.075,0.046-0.114,0.066
	c-0.069,0.021-0.139,0.036-0.21,0.05c-0.119,0.008-0.237,0.011-0.356,0.004c-0.025-0.006-0.049-0.013-0.073-0.021
	c-0.017-0.009-0.034-0.018-0.05-0.028c-0.007-0.007-0.014-0.014-0.021-0.022c-0.014-0.023-0.027-0.046-0.04-0.069
	c-0.028-0.083-0.05-0.167-0.067-0.253c-0.009-0.152-0.006-0.304,0.008-0.457c0.011-0.054,0.025-0.106,0.041-0.16
	c0.036-0.071,0.076-0.139,0.12-0.206c0.023-0.025,0.048-0.049,0.074-0.072c0.139-0.099,0.282-0.192,0.433-0.27
	c0.016-0.005,0.031-0.01,0.047-0.014c0.024-0.001,0.048-0.001,0.072-0.001c0.132,0,0.258-0.036,0.367-0.099
	c0.013,0.024,0.026,0.048,0.038,0.073c0.044,0.125,0.079,0.251,0.108,0.382C11.538,19.093,11.537,19.18,11.53,19.268z
	 M11.067,21.682c0.008-0.001,0.014-0.003,0.022-0.004c0.059-0.008,0.119-0.016,0.177-0.024
	C11.199,21.664,11.133,21.673,11.067,21.682z M18.461,20.364c-0.166-0.361-0.492-0.588-0.813-0.802
	c-0.105-0.069-0.228-0.101-0.352-0.101c-0.146,0-0.293,0.044-0.415,0.122c-0.146-0.022-0.292-0.04-0.441-0.047
	c-0.182-0.007-0.382,0.042-0.555,0.096c-0.315,0.096-0.579,0.273-0.83,0.479c-0.16,0.131-0.302,0.308-0.422,0.474
	c-0.12,0.166-0.229,0.33-0.311,0.518c-0.098,0.225-0.164,0.44-0.203,0.682c-0.026,0.157-0.046,0.313-0.053,0.472
	c0.009,0.111,0.024,0.221,0.041,0.33c0.024,0.09,0.057,0.177,0.1,0.26c0.109,0.256,0.306,0.479,0.522,0.653
	c0.282,0.232,0.597,0.382,0.955,0.459c0.689,0.148,1.449,0.013,2-0.435c0.382-0.31,0.614-0.785,0.782-1.235
	c0.116-0.312,0.164-0.662,0.182-0.99c0.009-0.158-0.018-0.328-0.044-0.483C18.577,20.654,18.531,20.514,18.461,20.364z M16.445,21
	c0.006,0.001,0.011,0.002,0.017,0.002C16.456,21.001,16.45,21.001,16.445,21L16.445,21z M16.435,20.998l-0.001,0
	c-0.021-0.003-0.042-0.006-0.063-0.009C16.392,20.992,16.414,20.995,16.435,20.998z M16.962,21.975
	c-0.063,0.131-0.135,0.259-0.213,0.381c-0.021,0.023-0.042,0.045-0.064,0.068c-0.031,0.02-0.064,0.039-0.097,0.056
	c-0.07,0.023-0.139,0.041-0.211,0.055c-0.096,0.005-0.191,0.004-0.287-0.002c-0.084-0.017-0.167-0.039-0.249-0.065
	c-0.044-0.023-0.086-0.047-0.127-0.073c-0.045-0.042-0.088-0.085-0.128-0.131c-0.006-0.009-0.011-0.018-0.017-0.027
	c-0.001-0.05,0.001-0.1,0.005-0.151c0.022-0.136,0.051-0.27,0.095-0.402c0.053-0.106,0.115-0.206,0.181-0.305
	c0.07-0.081,0.143-0.158,0.223-0.231c0.054-0.035,0.109-0.066,0.165-0.094c0.055-0.018,0.109-0.032,0.165-0.044
	c0.037-0.001,0.074,0,0.11,0.002c0.025,0.004,0.05,0.009,0.074,0.014c0.071,0.012,0.14,0.02,0.207,0.02
	c0.1,0,0.196-0.017,0.292-0.059c0.004,0.004,0.007,0.008,0.011,0.012c0.007,0.024,0.013,0.048,0.019,0.072
	c0.009,0.111,0.011,0.221,0.003,0.333C17.083,21.598,17.03,21.788,16.962,21.975z M23.379,17.804
	c-0.227-0.229-0.492-0.356-0.785-0.474c-0.065-0.017-0.131-0.026-0.197-0.026c-0.066,0-0.133,0.009-0.199,0.026
	c-0.105,0.029-0.203,0.082-0.286,0.153c-0.193-0.063-0.409-0.051-0.586,0.065c-0.157,0.101-0.313,0.204-0.465,0.317
	c-0.286,0.21-0.512,0.446-0.724,0.73c-0.068,0.09-0.112,0.197-0.159,0.302c-0.057,0.131-0.107,0.258-0.146,0.396
	c-0.068,0.24-0.092,0.501-0.09,0.749c0.009,0.582,0.278,1.141,0.706,1.528c0.223,0.199,0.457,0.321,0.73,0.433
	c0.147,0.063,0.348,0.089,0.505,0.096c0.201,0.007,0.389-0.017,0.588-0.05c0.341-0.055,0.66-0.232,0.924-0.448
	c0.118-0.096,0.225-0.19,0.321-0.308c0.341-0.422,0.507-0.944,0.551-1.478c0.039-0.465-0.028-0.924-0.225-1.348
	C23.73,18.22,23.569,17.997,23.379,17.804z M22.504,19.729c-0.02,0.101-0.044,0.198-0.075,0.297
	c-0.04,0.085-0.083,0.168-0.131,0.249c-0.05,0.055-0.104,0.106-0.16,0.156c-0.042,0.028-0.085,0.052-0.13,0.076
	c-0.061,0.019-0.121,0.035-0.183,0.049c-0.05,0.002-0.1,0-0.149-0.003c-0.025-0.006-0.049-0.013-0.073-0.02
	c-0.045-0.025-0.089-0.051-0.131-0.08c-0.045-0.042-0.089-0.085-0.131-0.13c-0.02-0.032-0.038-0.064-0.057-0.098
	c-0.027-0.073-0.049-0.146-0.067-0.222c-0.005-0.088-0.003-0.174,0.003-0.263c0.017-0.084,0.039-0.166,0.066-0.247
	c0.027-0.054,0.057-0.106,0.09-0.156c0.071-0.079,0.146-0.152,0.225-0.223c0.15-0.107,0.306-0.205,0.462-0.305
	c0.027-0.017,0.052-0.035,0.076-0.054c0.026,0.014,0.052,0.028,0.077,0.044c0.042,0.039,0.082,0.079,0.121,0.122
	c0.037,0.059,0.071,0.119,0.104,0.18c0.03,0.086,0.053,0.172,0.071,0.261C22.517,19.486,22.514,19.606,22.504,19.729z"/>
</svg>

              <span className="mx-2 text-sm font-medium">Colors</span>
            </a>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              href="/size-list"
            >
              
<svg className="h-5 w-5" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M11.5 3.04999C11.7485 3.04999 11.95 3.25146 11.95 3.49999V7.49999C11.95 7.74852 11.7485 7.94999 11.5 7.94999C11.2515 7.94999 11.05 7.74852 11.05 7.49999V4.58639L4.58638 11.05H7.49999C7.74852 11.05 7.94999 11.2515 7.94999 11.5C7.94999 11.7485 7.74852 11.95 7.49999 11.95L3.49999 11.95C3.38064 11.95 3.26618 11.9026 3.18179 11.8182C3.0974 11.7338 3.04999 11.6193 3.04999 11.5L3.04999 7.49999C3.04999 7.25146 3.25146 7.04999 3.49999 7.04999C3.74852 7.04999 3.94999 7.25146 3.94999 7.49999L3.94999 10.4136L10.4136 3.94999L7.49999 3.94999C7.25146 3.94999 7.04999 3.74852 7.04999 3.49999C7.04999 3.25146 7.25146 3.04999 7.49999 3.04999L11.5 3.04999Z"
    fill="#000000"
  />
</svg>

              <span className="mx-2 text-sm font-medium">Sizes</span>
            </a>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              href="/category-list"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                />
              </svg>

              <span className="mx-2 text-sm font-medium">Categories</span>
            </a>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              href="/add-product"
            >
              <svg width="800px" className="h-5 w-5" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><path d="M14 7v1H8v6H7V8H1V7h6V1h1v6h6z"/></svg>

              <span className="mx-2 text-sm font-medium">Add Product</span>
            </a>
          </div>

          <div className="space-y-3">
            <label className="px-3 text-xs text-gray-500 uppercase">Customization</label>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              href="/user-list2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8zm2 10a3 3 0 0 0-3 3 1 1 0 1 1-2 0 5 5 0 0 1 5-5h8a5 5 0 0 1 5 5 1 1 0 1 1-2 0 3 3 0 0 0-3-3H8z" fill="#0D0D0D"/></svg>

              <span className="mx-2 text-sm font-medium">User List</span>
            </a>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <span className="mx-2 text-sm font-medium">Profile Setting</span>
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
}

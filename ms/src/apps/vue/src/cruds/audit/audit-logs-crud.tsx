import { auditLogApi } from '@/api/abp-system/audit-logs'
import { AuditLog, AuditLogPageRequest } from '@/api/abp-system/audit-logs/typing'
import InfoItem from '@/components/crud-table/infos/info-item.vue'
import { useLocalization } from '@/hooks/abp/useLocalization'
import { useCrud } from '@/hooks/web/useCrud'
import { useCrudOptions } from '@/hooks/web/useCrudOptions'
import { QBtn, QCard, QCardSection, QChip, QExpansionItem } from 'quasar'
import { useI18n } from 'vue-i18n'
type Key = string
type Dto = AuditLog
type PageRequest = AuditLogPageRequest

const httpStatusCodeOptions = [
  {
    label: '100 - Continue',
    value: 100
  },
  {
    label: '101 - Switching Protocols',
    value: 101
  },
  {
    label: '200 - OK',
    value: 200
  },
  {
    label: '201 - Created',
    value: 201
  },
  {
    label: '202 - Accepted',
    value: 202
  },
  {
    label: '203 - Non-Authoritative Information',
    value: 203
  },
  {
    label: '204 - No Content',
    value: 204
  },
  {
    label: '205 - Reset Content',
    value: 205
  },
  {
    label: '206 - Partial Content',
    value: 206
  },
  {
    label: '207 - Multi-Status',
    value: 207
  },
  {
    label: '208 - Already Reported',
    value: 208
  },
  {
    label: '226 - IM Used',
    value: 226
  },
  {
    label: '300 - Multiple Choices',
    value: 300
  },
  {
    label: '301 - Moved Permanently',
    value: 301
  },
  {
    label: '302 - Found',
    value: 302
  },
  {
    label: '303 - See Other',
    value: 303
  },
  {
    label: '304 - Not Modified',
    value: 304
  },
  {
    label: '305 - Use Proxy',
    value: 305
  },
  {
    label: '306 - Switch Proxy',
    value: 306
  },
  {
    label: '307 - Temporary Redirect',
    value: 307
  },
  {
    label: '308 - Permanent Redirect',
    value: 308
  },
  {
    label: '400 - Bad Request',
    value: 400
  },
  {
    label: '401 - Unauthorized',
    value: 401
  },
  {
    label: '402 - Payment Required',
    value: 402
  },
  {
    label: '403 - Forbidden',
    value: 403
  },
  {
    label: '404 - Not Found',
    value: 404
  },
  {
    label: '405 - Method Not Allowed',
    value: 405
  },
  {
    label: '406 - Not Acceptable',
    value: 406
  },
  {
    label: '407 - Proxy Authentication Required',
    value: 407
  },
  {
    label: '408 - Request Timeout',
    value: 408
  },
  {
    label: '409 - Conflict',
    value: 409
  },
  {
    label: '410 - Gone',
    value: 410
  },
  {
    label: '411 - Length Required',
    value: 411
  },
  {
    label: '412 - Precondition Failed',
    value: 412
  },
  {
    label: '413 - Payload Too Large',
    value: 413
  },
  {
    label: '414 - URI Too Long',
    value: 414
  },
  {
    label: '415 - Unsupported Media Type',
    value: 415
  },
  {
    label: '416 - Range Not Satisfiable',
    value: 416
  },
  {
    label: '417 - Expectation Failed',
    value: 417
  },
  {
    label: "418 - I'm a Teapot",
    value: 418
  },
  {
    label: '421 - Misdirected Request',
    value: 421
  },
  {
    label: '422 - Unprocessable Entity',
    value: 422
  },
  {
    label: '423 - Locked',
    value: 423
  },
  {
    label: '424 - Failed Dependency',
    value: 424
  },
  {
    label: '425 - Too Early',
    value: 425
  },
  {
    label: '426 - Upgrade Required',
    value: 426
  },
  {
    label: '428 - Precondition Required',
    value: 428
  },
  {
    label: '429 - Too Many Requests',
    value: 429
  },
  {
    label: '431 - Request Header Fields Too Large',
    value: 431
  },
  {
    label: '451 - Unavailable For Legal Reasons',
    value: 451
  },
  {
    label: '500 - Internal Server Error',
    value: 500
  },
  {
    label: '501 - Not Implemented',
    value: 501
  },
  {
    label: '502 - Bad Gateway',
    value: 502
  },
  {
    label: '503 - Service Unavailable',
    value: 503
  },
  {
    label: '504 - Gateway Timeout',
    value: 504
  },
  {
    label: '505 - HTTP Version Not Supported',
    value: 505
  },
  {
    label: '506 - Variant Also Negotiates',
    value: 506
  },
  {
    label: '507 - Insufficient Storage',
    value: 507
  },
  {
    label: '508 - Loop Detected',
    value: 508
  },
  {
    label: '510 - Not Extended',
    value: 510
  },
  {
    label: '511 - Network Authentication Required',
    value: 511
  }
]

const mapHttpStatusCodeColor = (code: number) => {
  if (code >= 200 && code < 300) {
    return 'green'
  } else if (code >= 300 && code < 400) {
    return 'orange'
  }
  return 'red'
}

const mapHttpMethodColor = (method: string) => {
  if (method === 'GET') {
    return 'blue'
  } else if (method === 'POST') {
    return 'green'
  } else if (method === 'PUT') {
    return 'orange'
  } else if (method === 'DELETE') {
    return 'red'
  }
  return 'gray'
}

export const createAuditLogCrud = async ({
  tableConfigSavingKey
}: {
  tableConfigSavingKey?: string
}) => {
  const api = auditLogApi
  const localizationModuleName = 'AbpAuditLogging'
  const { L } = useLocalization(localizationModuleName)
  const { PageAction, InfoAction } = useCrud<Key, Dto, PageRequest>({
    pageApi: api.getPage,
    getByIdApi: api.getById
  })
  const { yesOrNoSelect } = useCrudOptions()
  const { d, locale } = useI18n()

  const pageAction = PageAction({
    columns: [
      {
        field: 'url',
        component: ({ row }) => (
          <div>
            {row.url}
            <QChip
              square
              outline
              dense
              color={mapHttpMethodColor(row.httpMethod)}
              label={row.httpMethod}
            />
            <QChip
              square
              outline
              dense
              color={mapHttpStatusCodeColor(row.httpStatusCode)}
              label={row.httpStatusCode}
            />
          </div>
        )
      },
      'userName',
      'clientIpAddress',
      'executionDuration',
      {
        field: 'executionTime',
        format: (val) => d(val, 'short', locale.value)
      },
      {
        field: '__actions',
        component: ({ row }) => (
          <QBtn
            color="primary"
            icon="search"
            dense
            onClick={() => {
              infoAction.showById(row.id)
            }}
          />
        )
      }
    ],
    request: {
      startTime: {
        type: 'date-between',
        betweenSecondField: 'endTime',
        startDateElementBinding: {
          label: computed(() => L('StartDate'))
        },
        endDateElementBinding: {
          label: computed(() => L('EndDate'))
        }
      },
      userName: {
        type: 'text'
      },
      url: {
        type: 'text'
      },
      minExecutionDuration: {
        type: 'number-between',
        betweenSecondField: 'maxExecutionDuration',
        minElementBinding: {
          label: computed(() => L('MinDuration'))
        },
        maxElementBinding: {
          label: computed(() => L('MaxDuration'))
        }
      },
      httpMethod: {
        type: 'select',
        options: ['GET', 'POST', 'PUT', 'DELETE', 'CONNECT', 'HEAD', 'OPTIONS', 'TRACE', 'PATCH'],
        class: 'w-40'
      },
      httpStatusCode: {
        type: 'select',
        options: httpStatusCodeOptions,
        emitValue: true,
        class: 'w-46'
      },
      applicationName: {
        type: 'text'
      },
      clientIpAddress: {
        type: 'text'
      },
      correlationId: {
        type: 'text'
      },
      hasException: {
        ...yesOrNoSelect(),
        class: 'w-40'
      }
    }
  })
  pageAction.loadTableConfigSaving(tableConfigSavingKey)

  const infoAction = InfoAction([
    'applicationName',
    {
      field: 'httpStatusCode',
      displayValueComponent: ({ row, label }) => (
        <QChip
          square
          outline
          dense
          color={mapHttpStatusCodeColor(row.httpStatusCode)}
          label={label}
        />
      )
    },
    {
      field: 'httpMethod',
      displayValueComponent: ({ row, label }) => (
        <QChip square outline dense color={mapHttpMethodColor(row.httpMethod)} label={label} />
      )
    },
    'url',
    'userName',
    'clientIpAddress',
    'clientName',
    'browserInfo',
    'executionTime',
    'executionDuration',
    {
      field: 'actions',
      component: ({ row, label }) => (
        <QCard>
          <QCardSection>
            <span class="font-bold text-xl">{label}</span>
          </QCardSection>
          <QCardSection>
            {row?.actions?.map((action) => (
              <QExpansionItem
                label={`${action.serviceName}——${action.methodName}`}
                header-class="bg-primary text-white"
                expand-icon-class="text-white"
                modelValue={true}
              >
                <QCard>
                  <QCardSection>
                    <InfoItem
                      displayName={L('ExecutionDuration')}
                      displayValue={action.executionDuration}
                    ></InfoItem>
                    <InfoItem
                      displayName={L('Parameters')}
                      displayValue={action.parameters}
                    ></InfoItem>
                  </QCardSection>
                </QCard>
              </QExpansionItem>
            ))}
          </QCardSection>
        </QCard>
      )
    }
  ])

  return {
    L,
    infoAction,
    localizationModuleName,
    pageAction,
    mapHttpStatusCodeColor,
    mapHttpMethodColor
  }
}

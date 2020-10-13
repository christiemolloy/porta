// @flow

import React, {useState} from 'react'
import {
  Form,
  Level,
  LevelItem,
  InputGroup,
  TextInput,
  Button,
  ButtonVariant,
  PageSection,
  Pagination,
  PaginationVariant,
  PageSectionVariants,
  Title,
  Divider,
  Toolbar,
  ToolbarItem
} from '@patternfly/react-core'
import {
  Table,
  TableHeader,
  TableBody
} from '@patternfly/react-table'
import SearchIcon from '@patternfly/react-icons/dist/js/icons/search-icon'
import 'BackendApis/styles/backends.scss'
import 'patternflyStyles/dashboard'

import { createReactWrapper } from 'utilities/createReactWrapper'

type Props = {
  backendsCount: number,
  backends: Array<{
    id: number,
    link: string,
    links: Array<{
      name: string,
      path: string
    }>,
    name: string,
    products_count: number,
    type: string,
    updated_at: string,
  }>
}

const BackendsIndexPage = (props: Props) => {
  console.log('THIS IS THE PROPS' + JSON.stringify(props))

  const [passedInProps, setPassedInProps] = useState(props)
  console.log('what is the state' + setPassedInProps)

  const tableColumns = [
    'Name',
    'System name',
    'Last updated',
    'Private base URL',
    'Linked products'
  ]

  const tableRows = props.backends.map((tableRow) => {
    return {
      cells: [
        { title: <a href="/">{tableRow.name}</a> },
        tableRow.system_name,
        <span className="api-table-timestamp">{tableRow.updated_at}</span>,
        tableRow.private_endpoint,
        tableRow.products_count
      ]
    }
  })

  const linkToPage = (event, rowId, rowData, extra, actionNumber) => {
    const path = passedInProps && passedInProps.backends[rowId].links[actionNumber].path
    window.location.href = path
  }

  const tableActions = [
    {
      title: 'Edit',
      onClick: (event, rowId, rowData, extra) => linkToPage(event, rowId, rowData, extra, 0)
    },
    {
      title: 'Overview',
      onClick: (event, rowId, rowData, extra) => linkToPage(event, rowId, rowData, extra, 1)
    },
    {
      title: 'Analytics',
      onClick: (event, rowId, rowData, extra) => linkToPage(event, rowId, rowData, extra, 2)
    },
    {
      title: 'Methods and Metrics',
      onClick: (event, rowId, rowData, extra) => linkToPage(event, rowId, rowData, extra, 3)
    },
    {
      title: 'Mapping Rules',
      onClick: (event, rowId, rowData, extra) => linkToPage(event, rowId, rowData, extra, 4)
    }
  ]

  const url = new URL(window.location.href)
  var perPage = url.searchParams.get('per_page')
  var page = url.searchParams.get('page')

  const selectPerPage = (_event, selectedPerPage) => {
    url.searchParams.set('per_page', selectedPerPage)
    url.searchParams.delete('page')
    window.location.href = url.toString()
  }

  const goToNextPage = (_event, number) => {
    url.searchParams.set('page', number)
    window.location.href = url.toString()
  }

  const goToPreviousPage = (_event, number) => {
    url.searchParams.set('page', number)
    window.location.href = url.toString()
  }

  const onFirstClick = (_event, number) => {
    url.searchParams.set('page', number)
    window.location.href = url.toString()
  }

  const onLastClick = (_event, number) => {
    url.searchParams.set('page', number)
    window.location.href = url.toString()
  }

  return (
    <>
      <PageSection className="api-table-page-section" variant={PageSectionVariants.light}>
        <Level>
          <LevelItem>
            <Title headingLevel="h1" size="2xl">Backends</Title>
          </LevelItem>
          <LevelItem>
            <Button variant="primary" component="a" href="/p/admin/backend_apis/new">
              Create Backend
            </Button>
          </LevelItem>
        </Level>
        <p className="api-table-description">
          Explore and manage all your internal APIs.
        </p>
        <Divider/>
        <Toolbar id="top-toolbar" className="pf-c-toolbar">
          <div className="pf-c-toolbar__content">
            <ToolbarItem>
              <Form id="new_search" action="/p/admin/backend_apis" accept-charset="UTF-8" method="get">
                <InputGroup className="api-table-search">
                  <TextInput name="utf8" type="hidden" value="✓" />
                  <TextInput placeholder="Find a Backend" name="search[query]" id="findProduct" type="search" aria-label="Find a product" />
                  <Button variant={ButtonVariant.control} aria-label="search button for search input">
                    <SearchIcon />
                  </Button>
                </InputGroup>
              </Form>
            </ToolbarItem>
            <ToolbarItem className="api-toolbar-pagination" align={{ default: 'alignRight' }}>
              <Pagination
                widgetId="pagination-options-menu-top"
                itemCount={props.backendsCount}
                perPage={Number(perPage) === 0 ? 20 : perPage}
                page={Number(page)}
                onNextClick={goToNextPage}
                onPreviousClick={goToPreviousPage}
                onPerPageSelect={selectPerPage}
                onFirstClick={onFirstClick}
                onLastClick={onLastClick}
                perPageOptions={[ { title: '10', value: 10 }, { title: '20', value: 20 } ]}
              />
              />
            </ToolbarItem>
          </div>
        </Toolbar>
        <Table aria-label="Actions Table" actions={tableActions} cells={tableColumns} rows={tableRows}>
          <TableHeader />
          <TableBody />
        </Table>
        <Toolbar id="bottom-toolbar" className="pf-c-toolbar">
          <div className="pf-c-toolbar__content">
            <ToolbarItem className="api-toolbar-pagination" align={{ default: 'alignRight' }}>
              <Pagination
                widgetId="pagination-options-menu-top"
                itemCount={props.backendsCount}
                perPage={Number(perPage) === 0 ? 20 : perPage}
                page={Number(page)}
                variant={PaginationVariant.bottom}
                onNextClick={goToNextPage}
                onPreviousClick={goToPreviousPage}
                onPerPageSelect={selectPerPage}
                onFirstClick={onFirstClick}
                onLastClick={onLastClick}
                perPageOptions={[ { title: '10', value: 10 }, { title: '20', value: 20 } ]}
              />
            </ToolbarItem>
          </div>
        </Toolbar>
      </PageSection>
    </>
  )
}

const BackendsIndexPageWrapper = (props: Props, containerId: string) => createReactWrapper(<BackendsIndexPage {...props} />, containerId)

export { BackendsIndexPageWrapper }

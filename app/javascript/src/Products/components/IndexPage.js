// @flow

import React, {useState} from 'react'
import {
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
import 'Products/components/styles/products.scss'
import 'patternflyStyles/dashboard'

import { createReactWrapper } from 'utilities/createReactWrapper'

type Props = {
  products: Array<{
    apps_count: number,
    backends_count: number,
    id: number,
    link: string,
    links: Array<{
      name: string,
      path: string
    }>,
    name: string,
    type: string,
    unread_alerts_count: number,
    updated_at: string
  }>
}

const ProductsIndexPage = (props: Props) => {
  console.log('THIS IS THE PROPS' + JSON.stringify(props))

  const [perPage, setPerPage] = useState(20)
  const [page, setPage] = useState(1)
  const tableColumns = [
    'Name',
    'System name',
    'Recently updated',
    'Applications',
    'Backends used',
    'Unread alerts'
  ]

  const [passedInProps, setPassedInProps] = useState(props)

  console.log('what is the state' + setPassedInProps)

  const tableRows = props.products.map((tableRow) => {
    return {
      cells: [
        { title: <a href="/">{tableRow.name}</a> },
        tableRow.system_name,
        <span className="api-table-timestamp">{tableRow.updated_at}</span>,
        tableRow.apps_count,
        tableRow.backends_count,
        tableRow.unread_alerts_count
      ]
    }
  })

  const linkToPage = (event, rowId, rowData, extra, actionNumber) => {
    const path = passedInProps && passedInProps.products[rowId].links[actionNumber].path
    window.location.href = path
  }

  const tableActions = (products) => [
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
      title: 'Applications',
      onClick: (event, rowId, rowData, extra) => linkToPage(event, rowId, rowData, extra, 3)
    },
    {
      title: 'ActiveDocs',
      onClick: (event, rowId, rowData, extra) => linkToPage(event, rowId, rowData, extra, 4)
    },
    {
      title: 'Integration',
      onClick: (event, rowId, rowData, extra) => linkToPage(event, rowId, rowData, extra, 5)
    }
  ]

  const onSetPage = (_event, pageNumber) => {
    setPage(pageNumber)
  }

  const onPerPageSelect = (_event, perPage) => {
    setPerPage(perPage)
  }

  return (
    <>
      <PageSection className="api-table-page-section" variant={PageSectionVariants.light}>
        <Level>
          <LevelItem>
            <Title headingLevel="h1" size="2xl">API Products</Title>
          </LevelItem>
          <LevelItem>
            <Button variant="primary" component="a" href="/apiconfig/services/new">
              New Product
            </Button>
          </LevelItem>
        </Level>
        <p className="api-table-description">Here is some content about Products. We could also include a link to documentation.</p>
        <Divider/>
        <Toolbar id="top-toolbar" className="pf-c-toolbar">
          <div className="pf-c-toolbar__content">
            <ToolbarItem>
              <InputGroup className="api-table-search">
                <TextInput placeholder="Find a product" name="findProduct" id="findProduct" type="search" aria-label="Find a product" />
                <Button variant={ButtonVariant.control} aria-label="search button for search input">
                  <SearchIcon />
                </Button>
              </InputGroup>
            </ToolbarItem>
            <ToolbarItem className="api-toolbar-pagination" align={{ default: 'alignRight' }}>
              <Pagination
                itemCount={37}
                perPage={perPage}
                page={page}
                onSetPage={onSetPage}
                widgetId="pagination-options-menu-top"
                onPerPageSelect={onPerPageSelect}
              />
            </ToolbarItem>
          </div>
        </Toolbar>
        <Table aria-label="Actions Table" actions={tableActions(props.products)} cells={tableColumns} rows={tableRows}>
          <TableHeader />
          <TableBody />
        </Table>
        <Toolbar id="bottom-toolbar" className="pf-c-toolbar">
          <div className="pf-c-toolbar__content">
            <ToolbarItem className="api-toolbar-pagination" align={{ default: 'alignRight' }}>
              <Pagination
                itemCount={37}
                perPage={perPage}
                page={page}
                variant={PaginationVariant.bottom}
                onSetPage={onSetPage}
                widgetId="pagination-options-menu-top"
                onPerPageSelect={onPerPageSelect}
              />
            </ToolbarItem>
          </div>
        </Toolbar>
      </PageSection>
    </>
  )
}

const ProductsIndexPageWrapper = (props: Props, containerId: string) => createReactWrapper(<ProductsIndexPage {...props} />, containerId)

export { ProductsIndexPageWrapper }

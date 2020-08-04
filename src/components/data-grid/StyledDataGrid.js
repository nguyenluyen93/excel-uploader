import React from 'react'
import PropTypes from 'prop-types'
import { AgGridReact } from 'ag-grid-react'
import styled from 'styled-components/macro'
import theme from 'styled-theming'
import { colors } from '../../constants'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

const borderColor = theme('mode', {
  light: colors.gray[300],
  dark: colors.gray[700],
})

const bgColor = theme('mode', {
  light: colors.gray[200],
  dark: colors.gray[800],
})

const rowEvenBgColor = theme('mode', {
  light: colors.gray[100],
  dark: colors.gray[900],
})

const rowOddBgColor = theme('mode', {
  light: colors.gray[200],
  dark: colors.gray[800],
})

const hoverBgColor = theme('mode', {
  light: colors.gray[300],
  dark: colors.gray[700],
})

const dangerBgColor = theme('mode', {
  light: colors.pink[200],
  dark: colors.pink[800],
})

const hoverDangerBgColor = theme('mode', {
  light: colors.pink[400],
  dark: colors.pink[600],
})

const activeDangerBgColor = theme('mode', {
  light: colors.pink[300],
  dark: colors.pink[700],
})

const warnBgColor = theme('mode', {
  light: colors.orange[200],
  dark: colors.orange[800],
})

const hoverWarnBgColor = theme('mode', {
  light: colors.orange[400],
  dark: colors.orange[600],
})

const activeWarnBgColor = theme('mode', {
  light: colors.orange[300],
  dark: colors.orange[700],
})

const selectedBgColor = theme('mode', {
  light: colors.indigo[300],
  dark: colors.indigo[500],
})

const focusFgColor = theme('mode', {
  light: colors.indigo[600],
  dark: colors.indigo[500],
})

const doubleFocusFgColor = theme('mode', {
  light: colors.indigo[600],
  dark: colors.gray[800],
})

const focusBorderColor = theme('mode', {
  light: colors.indigo[600],
  dark: colors.indigo[500],
})

const iconColor = theme('mode', {
  light: colors.gray[500],
  dark: colors.gray[600],
})

const infoFgColor = theme('mode', {
  light: colors.indigo[500],
  dark: colors.indigo[600],
})

const successFgColor = theme('mode', {
  light: colors.teal[500],
  dark: colors.teal[600],
})

const dangerFgColor = theme('mode', {
  light: colors.pink[500],
  dark: colors.pink[600],
})

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 21rem);

  &.ag-theme-balham {
    color: inherit;

    .ag-root {
      border-color: ${borderColor};
    }

    .ag-header {
      color: inherit;
      background-color: ${bgColor};
      border-bottom-color: ${borderColor};

      .ag-header-cell::after,
      .ag-header-group-cell::after {
        border-right-color: ${borderColor};
      }
    }

    .ag-row {
      border: none;
      border-color: ${borderColor};

      &:hover {
        background-color: ${hoverBgColor} !important;
      }

      &.grid-row-invalid:hover {
        background-color: ${hoverDangerBgColor} !important;
      }

      &.grid-row-warn:hover {
        background-color: ${hoverWarnBgColor} !important;
      }

      &.ag-row-selected {
        background-color: ${selectedBgColor} !important;
      }
    }

    .ag-row-even {
      background-color: ${rowEvenBgColor};

      &.grid-row-invalid {
        background-color: ${dangerBgColor} !important;
      }

      &.grid-row-warn {
        background-color: ${warnBgColor} !important;
      }
    }

    .ag-row-odd {
      background-color: ${rowOddBgColor};

      &.grid-row-invalid {
        background-color: ${activeDangerBgColor} !important;
      }

      &.grid-row-warn {
        background-color: ${activeWarnBgColor} !important;
      }
    }

    .ag-icon {
      color: ${iconColor};
    }

    .ag-ltr .ag-has-focus .ag-cell-focus,
    .ag-ltr .ag-has-focus .ag-cell-focus:not(.ag-cell-range-seleted) {
      color: ${focusFgColor};
      border-color: ${focusBorderColor};
    }

    .ag-row-selected {
      .ag-cell-focus {
        color: ${doubleFocusFgColor} !important;
      }
    }

    .ag-ltr .ag-row.ag-cell-last-left-pinned,
    .ag-ltr .ag-cell:not(.ag-cell-focus).ag-cell-last-left-pinned {
      border-right-color: ${borderColor};
    }

    .ag-center-cols-viewport,
    .ag-body-viewport {
      background-color: ${bgColor};
    }

    .ag-pinned-left-header {
      border-right: 1px solid ${borderColor};
    }

    .fg-info {
      color: ${infoFgColor};
    }

    .fg-success {
      color: ${successFgColor};
    }

    .fg-danger {
      color: ${dangerFgColor};
    }
  }
`

const StyledDataGrid = ({
  columnDefs,
  defaultColDef,
  rowData,
  rowDragManaged,
  getRowClass,
  getRowNodeId,
  onCellValueChanged,
  onGridReady,
  onRowDragEnd,
  onRowSelected,
  ...other
}) => {
  return (
    <Wrapper className="ag-theme-balham">
      <AgGridReact
        animateRows
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
        rowDragManaged={rowDragManaged}
        getRowClass={getRowClass}
        getRowNodeId={getRowNodeId}
        onCellValueChanged={onCellValueChanged}
        onGridReady={onGridReady}
        onRowDragEnd={onRowDragEnd}
        onRowSelected={onRowSelected}
        {...other}
      />
    </Wrapper>
  )
}

StyledDataGrid.propTypes = {
  columnDefs: PropTypes.array.isRequired,
  defaultColDef: PropTypes.object,
  rowData: PropTypes.array.isRequired,
  rowDragManaged: PropTypes.bool,
  getRowClass: PropTypes.func,
  getRowNodeId: PropTypes.func,
  onCellValueChanged: PropTypes.func,
  onGridReady: PropTypes.func,
  onRowDragEnd: PropTypes.func,
  onRowSelected: PropTypes.func,
}

export default StyledDataGrid

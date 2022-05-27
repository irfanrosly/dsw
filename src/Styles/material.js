import { makeStyles } from '@mui/styles'
const APP_GOLD = '#FFC83D'

// Styling for textfield
export const useTextfieldStyles = makeStyles({
  root: {
    '& input': {
      borderRadius: '5px',
      border: 'solid 0.1rem #D7D7D7',
      padding: '18px 15px',
      fontSize: '15px',
      background: '#fff'
    },
    '& input[readonly]': {
      background: '#d7d7d7'
    }
  }
})

export const useTooltipStyle = makeStyles({
  arrow: {
    color: 'black'
  },
  tooltip: {
    padding: '10px',
    backgroundColor: 'black'
  }
})

export const useCheckboxStyle = makeStyles({
  root: {
    '& .MuiCheckbox-root': {
      '& img': {
        width: '25px'
      }
    }
  }
})

export const useRadioStyle = makeStyles({
  root: {
    '& .outlined': {
      '& .MuiFormControlLabel-root': {
        border: 'solid 0.1rem #D7D7D7',
        borderRadius: '7px',
        boxShadow: '0 0 1rem 0 rgb(118 118 118 / 10%)',
        marginBottom: '1rem',
        paddingRight: '15px'
      },
      '& .MuiFormControlLabel-root:hover': {
        boxShadow: '0 0 1rem 0 rgb(128 128 128 / 50%)'
      },
      '& .MuiRadio-root': {
        marginRight: '10px'
      }
    },
    '& .MuiRadio-root': {
      '& img': {
        width: '25px'
      }
    }
  }
})

// Styling for dropdown select
export const useSelectStyles = makeStyles({
  root: {
    '& .MuiSelect-select': {
      borderRadius: '5px',
      border: 'solid 0.1rem #D7D7D7',
      padding: '9px 15px',
      fontSize: '15px',
      minWidth: '50px',

      '&:focus': {
        backgroundColor: '#fff'
      }
    },

    '&.select-light': {
      '& .MuiSelect-select': {
        border: 'solid 0.1rem #373737',
        color: '#373737',
        backgroundColor: '#fff'
      }
    },

    '& .MuiSelect-icon': {
      right: '12px'
    }
  },
  option: {
    background: '#373737',
    color: '#d7d7d7',
    fontSize: '15px',
    padding: '3px 15px',
    minHeight: '30px',

    '&.menu-light': {
      background: '#fff',
      color: '#171717',

      '&.Mui-selected': {
        background: '#fff'
      }
    },

    '&:hover': {
      color: APP_GOLD
    },

    '&.Mui-selected': {
      color: APP_GOLD
    },

    '&.tabs--mobile': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      background: '#fff',
      color: '#9b9b9b',
      borderTop: '1px solid #eee',
      padding: '10px',
      justifyContent: 'center',

      '&.dashboard': {
        minHeight: '63px'
      },

      '&.Mui-selected': {
        color: '#171717'
      },

      '&:hover': {
        color: '#171717',
        background: 'none'
      },

      '& .tab--label': {
        fontSize: '13px'
      },

      '& .tab--expand-label': {
        fontSize: '15px'
      }
    }
  },
  optionContainer: {
    padding: '10px 0',
    background: '#373737',

    '&.menu-light': {
      background: '#fff'
    },

    '&.tabs--mobile': {
      background: '#fff',
      padding: '2px 10px'
    }
  },
  menu: {
    marginTop: '2px',

    '&.menu-light': {
      '& .MuiPaper-root': {
        borderRadius: '5px',
        border: '0.1rem solid #373737',
        marginTop: '-2px'
      }
    }
  }
})

export const useMenuStyle = makeStyles({
  root: {
    '& .MuiMenu-paper': {
      marginTop: '-12px'
    },

    '& .MuiMenu-list': {
      padding: '10px 15px 5px 15px',
      background: '#373737',
      minWidth: '150px',

      '& .MuiMenuItem-root': {
        fontSize: '13px',
        color: '#fff',
        padding: '0 0 5px 0'
      },

      '& .MuiMenuItem-root:hover': {
        color: APP_GOLD
      }
    }
  }
})

export const useProgressBarStyle = makeStyles((theme) => ({
  bar: { borderRadius: 5 },
  root: { height: 10, borderRadius: 5 },
  colorPrimary: {
    backgroundColor: "#616161"
    //this code have error 
    // theme.palette.gray[theme.palette.type === 'light' ? 200 : 700]
  }
}))

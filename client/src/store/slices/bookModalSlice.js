/**
 * @file bookModalSlice.js
 * @description Redux slice that stores the state of the currently open
 *              Book Preview / Edit modal.
 */

import { createSlice } from '@reduxjs/toolkit'

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const initialForm = { meta: {}, flags: {}, stats: {} }

const initialState = {
  form: initialForm,
  isEditingMain:  false,
  isEditingNotes: false,
}

// -----------------------------------------------------------------------------
// Slice
// -----------------------------------------------------------------------------

const bookModalSlice = createSlice({
  name: 'bookModal',
  initialState,
  reducers: {
    // -----------------------------------------------------------------------
    //  Snapshot / reset
    // -----------------------------------------------------------------------
    setForm(state, action) {
      state.form = action.payload
        ? structuredClone(action.payload) // deep copy → local editing
        : initialForm
    },
    resetForm(state) {
      state.form          = initialForm
      state.isEditingMain = false
      state.isEditingNotes = false
    },

    // -----------------------------------------------------------------------
    //  Single-field helpers (used by inputs)
    // -----------------------------------------------------------------------
    updateMetaField(state, action) {
      const { name, value } = action.payload
      state.form.meta[name] = value
    },
    updateFlagField(state, action) {
      const { name, value } = action.payload
      state.form.flags[name] = value
    },

    // -----------------------------------------------------------------------
    //  Edit-mode toggles
    // -----------------------------------------------------------------------
    setEditingMain(state, action)  { state.isEditingMain  = action.payload },
    setEditingNotes(state, action) { state.isEditingNotes = action.payload }

    // -----------------------------------------------------------------------
    //  Bulk merge from optimistic update / server PATCH
    //  Payload shape: { meta?, flags?, stats? }
    // -----------------------------------------------------------------------
    ,
    updateFormFields(state, action) {
      const { meta, flags, stats } = action.payload
      if (meta)  Object.assign(state.form.meta,  meta)
      if (flags) Object.assign(state.form.flags, flags)
      if (stats) Object.assign(state.form.stats, stats)
    },
  },
})

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const {
  setForm,
  resetForm,
  updateMetaField,
  updateFlagField,
  setEditingMain,
  setEditingNotes,
  updateFormFields,
} = bookModalSlice.actions

export default bookModalSlice.reducer

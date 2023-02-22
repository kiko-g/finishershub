import { GoogleSpreadsheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'

const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/gm, '\n')
const GOOGLE_SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!

type Data = {
  table?: any
  message?: string
}

// @desc     Get finishers catalogue for mw2 from google sheets
// @route    GET /api/mw2/catalogue
// @access   Public
export default async function getSheetsData(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log('GOOGLE_PRIVATE_KEY', GOOGLE_PRIVATE_KEY)
  console.log('GOOGLE_SPREADSHEET_ID', GOOGLE_SPREADSHEET_ID)
  console.log('GOOGLE_SERVICE_ACCOUNT_EMAIL', GOOGLE_SERVICE_ACCOUNT_EMAIL)

  try {
    const doc = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_ID)
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY,
    })

    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    const rows = await sheet.getRows()
    const data = rows.map((row) => row._rawData)

    res.status(200).json({
      message: 'Success',
      table: {
        headers: rows[0]._sheet.headerValues,
        rows: data,
      },
    })
  } catch (error) {
    res.status(500).json({
      table: null,
      message: error instanceof Error ? error.message : 'Error retrieving data from Google Sheets',
    })
  }
}

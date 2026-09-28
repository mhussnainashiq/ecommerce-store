
import { useState } from "react"
import { Link } from "react-router-dom"

function Settings() {

  const [settings, setSettings] =
    useState(() => {

      const savedSettings =
        localStorage.getItem(
          "ecommerce-settings"
        )

      return savedSettings
        ? JSON.parse(savedSettings)
        : {
            storeName: "ShopEase",
            storeEmail:
              "admin@shopease.com",
            currency: "USD",
          }
    })


  const [savedMessage, setSavedMessage] =
    useState("")


  function handleChange(event) {

    const {
      name,
      value,
    } = event.target

    setSettings((currentSettings) => ({
      ...currentSettings,
      [name]: value,
    }))
  }


  function handleSubmit(event) {

    event.preventDefault()

    localStorage.setItem(
      "ecommerce-settings",
      JSON.stringify(settings)
    )

    setSavedMessage(
      "Settings saved successfully!"
    )

    setTimeout(() => {
      setSavedMessage("")
    }, 3000)
  }


  return (
    <main className="admin-page">

      <div className="admin-header">

        <div>

          <p className="admin-label">
            ADMIN PANEL
          </p>

          <h1>
            Settings
          </h1>

          <p>
            Manage your store settings.
          </p>

        </div>


        <Link
          to="/admin"
          className="view-store-button"
        >
          ← Dashboard
        </Link>

      </div>


      <section className="admin-form-card">

        <h2>
          Store Settings
        </h2>

        <p className="admin-form-description">
          Update your store information below.
        </p>


        {savedMessage && (

          <div className="settings-success-message">
            ✓ {savedMessage}
          </div>

        )}


        <form onSubmit={handleSubmit}>

          <div className="admin-form-group">

            <label htmlFor="storeName">
              Store Name
            </label>

            <input
              id="storeName"
              name="storeName"
              type="text"
              value={settings.storeName}
              onChange={handleChange}
              placeholder="Enter store name"
              required
            />

          </div>


          <div className="admin-form-group">

            <label htmlFor="storeEmail">
              Store Email
            </label>

            <input
              id="storeEmail"
              name="storeEmail"
              type="email"
              value={settings.storeEmail}
              onChange={handleChange}
              placeholder="Enter store email"
              required
            />

          </div>


          <div className="admin-form-group">

            <label htmlFor="currency">
              Currency
            </label>

            <select
              id="currency"
              name="currency"
              value={settings.currency}
              onChange={handleChange}
            >

              <option value="USD">
                USD ($)
              </option>

              <option value="PKR">
                PKR (₨)
              </option>

              <option value="EUR">
                EUR (€)
              </option>

              <option value="GBP">
                GBP (£)
              </option>

            </select>

          </div>


          <div className="product-preview">

            <p>
              Current Settings
            </p>

            <div className="product-preview-box">

              <span>
                🏪
              </span>

              <div>

                <strong>
                  {settings.storeName}
                </strong>

                <p>
                  {settings.storeEmail}
                </p>

                <b>
                  Currency:{" "}
                  {settings.currency}
                </b>

              </div>

            </div>

          </div>


          <div className="admin-form-actions">

            <Link
              to="/admin"
              className="admin-cancel-button"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="admin-save-button"
            >
              Save Settings
            </button>

          </div>

        </form>

      </section>

    </main>
  )
}

export default Settings


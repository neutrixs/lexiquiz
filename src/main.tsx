;(async () => {
    const reactImport = import('react')
    const reactDOMImport = import('react-dom/client')
    const MainComponentImport = import('./components/main')

    const { default: React } = await reactImport
    const { createRoot } = await reactDOMImport
    const { default: MainComponent } = await MainComponentImport

    const rootElement = document.createElement('div')
    const root = createRoot(rootElement)
    root.render(<MainComponent />)

    document.body.insertBefore(rootElement, document.body.firstChild)

    const loading = document.getElementById('loading')
    loading?.parentElement?.removeChild(loading)
})()

export {}

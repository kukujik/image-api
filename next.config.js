module.exports = {
  rewrites: () => [{ source: '/:path+', destination: '/api/:path*' }],
  headers: () => [{
    source: '/:path*',
    headers: [
      { key: 'Cache-Control', value: 'no-store, max-age=0' },
      { key: 'CDN-Cache-Control', value: 'no-store' }
    ]
  }],
  output: 'standalone'
}
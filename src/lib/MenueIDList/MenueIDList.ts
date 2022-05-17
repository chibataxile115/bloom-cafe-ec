const MenueIDList = (mode: 'left' | 'right') => {
  if (mode === 'left') {
    const leftMenueIDs = [
      { id: 0, value: 'aaa' },
      { id: 1, value: 'aab' },
      { id: 2, value: 'abb' },
      { id: 3, value: 'bbb' },
      { id: 4, value: 'bbc' },
      { id: 5, value: 'bcc' },
      { id: 6, value: 'ccc' },
      { id: 7, value: 'ccd' },
      { id: 8, value: 'cdd' },
      { id: 9, value: 'ddd' },
      { id: 10, value: 'dde' },
      { id: 11, value: 'dee' },
      { id: 12, value: 'eee' },
    ]
    return leftMenueIDs
  } else {
    const rightMenueIDs = [
      { id: 0, value: '001' },
      { id: 1, value: '002' },
      { id: 2, value: '003' },
      { id: 3, value: '004' },
      { id: 4, value: '005' },
      { id: 5, value: '006' },
      { id: 6, value: '007' },
      { id: 7, value: '008' },
      { id: 8, value: '009' },
      { id: 9, value: '010' },
      { id: 10, value: '012' },
      { id: 11, value: '013' },
      { id: 12, value: '014' },
      { id: 13, value: '015' },
      { id: 14, value: '016' },
      { id: 15, value: '017' },
      { id: 16, value: '018' },
      { id: 17, value: '019' },
      { id: 18, value: '020' },
      { id: 19, value: '021' },
      { id: 20, value: '022' },
      { id: 21, value: '023' },
      { id: 22, value: '024' },
    ]
    return rightMenueIDs
  }
}

export default MenueIDList

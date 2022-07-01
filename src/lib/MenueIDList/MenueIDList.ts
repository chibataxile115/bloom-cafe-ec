const MenueIDList = (mode: 'left' | 'right') => {
  if (mode === 'left') {
    const leftMenueIDs = [
      { id: 0, value: 'plt' },
      { id: 1, value: 'box' },
      { id: 2, value: 'snd' },
      { id: 3, value: 'bgr' },
      { id: 4, value: 'bwl' },
      { id: 5, value: 'sid' },
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
    ]
    return rightMenueIDs
  }
}

export default MenueIDList

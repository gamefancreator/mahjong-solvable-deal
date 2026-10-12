(function (root) {
  'use strict';

  var LAYOUTS = {
    turtle: { name: 'Turtle', note: '144 tiles', runs: [
      [0, 0, 2, 12], [0, 2, 6, 8], [0, 4, 4, 10], [0, 6, 2, 12], [0, 8, 2, 12], [0, 10, 4, 10], [0, 12, 6, 8], [0, 14, 2, 12],
      [1, 2, 8, 6], [1, 4, 8, 6], [1, 6, 8, 6], [1, 8, 8, 6], [1, 10, 8, 6], [1, 12, 8, 6],
      [2, 4, 10, 4], [2, 6, 10, 4], [2, 8, 10, 4], [2, 10, 10, 4], [3, 6, 12, 2], [3, 8, 12, 2]],
      singles: [[0, 7, 0], [26, 7, 0], [28, 7, 0], [13, 7, 4]] },
    harbor: { name: 'Harbor', note: '72 tiles', runs: [
      [0, 0, 0, 4], [0, 0, 16, 4], [0, 2, 0, 4], [0, 2, 16, 4], [0, 4, 0, 12], [0, 6, 0, 12], [0, 8, 4, 8],
      [1, 1, 1, 3], [1, 1, 17, 3], [1, 4, 4, 8], [1, 6, 4, 8], [2, 5, 9, 2]], singles: [] },
    sails: { name: 'Three Sails', note: '94 tiles, tall', runs: [
      [0, 0, 0, 7], [0, 2, 0, 7], [0, 4, 2, 5], [0, 6, 0, 7], [0, 8, 0, 7], [0, 10, 2, 5], [0, 12, 0, 7], [0, 14, 0, 7],
      [1, 1, 1, 6], [1, 7, 1, 6], [1, 13, 1, 6], [1, 4, 4, 3], [1, 10, 4, 3],
      [2, 1, 3, 4], [2, 7, 3, 4], [2, 13, 3, 4], [3, 1, 5, 2], [3, 7, 5, 2], [3, 13, 5, 2]], singles: [] },
    pyramid: { name: 'Pyramid', note: '108 tiles, four layers', map: [
      ['# # # # # # # # # #', '', '# # # # # # # # # #', '', '# # # # # # # # # #', '', '# # # # # # # # # #', '', '# # # # # # # # # #', '', '# # # # # # # # # #'],
      ['', '', '  # # # # # # # #', '', '  # # # # # # # #', '', '  # # # # # # # #', '', '  # # # # # # # #'],
      ['', '', '', '', '    # # # # # #', '', '    # # # # # #'],
      ['', '', '', '', '', '      # # # #']] },
    fortress: { name: 'Fortress', note: '114 tiles, walls and keep', map: [
      ['# # # # # # # # # # # # # #', '', '# # # # # # # # # # # # # #', '', '# #                     # #', '',
       '# #       # # # #       # #', '', '# #       # # # #       # #', '', '# #       # # # #       # #', '',
       '# #                     # #', '', '# # # # # # # # # # # # # #', '', '# # # # # # # # # # # # # #'],
      ['# #                     # #', '', '# #                     # #', '', '', '', '', '            # #', '', '            # #', '', '', '',
       '# #                     # #', '            # #', '# #                     # #'],
      ['', ' #                       #', '', '', '', '', '', '', '', '', '', '', '', '', '', ' #                       #']] },
    crab: { name: 'Crab', note: '74 tiles, eight legs', map: [
      ['  #                         #', '    #                     #', '      #    #       #    #', '  #                         #', '    #   # # # # # # # #   #', '      #                 #', '        # # # # # # # #', '', '      # # # # # # # # # #', '    #                     #', '  #     # # # # # # # #     #', '      #                 #', '    #                     #', '  #                         #'],
      ['', '', '', '', '', '', '          # # # # # #', '', '          # # # # # #'],
      ['', '', '', '', '', '', '', '            # # # #']] },
    arena: { name: 'Arena', note: '70 tiles, ring and field', map: [
      ['    # # # # # # # # #', '', '  #                   #', '', '#                       #', '        # # # # #', '#                       #', '        # # # # #',
       '#                       #', '        # # # # #', '#                       #', '', '  #                   #', '', '    # # # # # # # # #'],
      ['      # # # # # # #', '', '', '', '', '', '#         # # #         #', '', '#         # # #         #', '', '', '', '', '', '      # # # # # # #'],
      ['', '', '', '', '', '', '', '            #']] },
    bridge: { name: 'Bridge', note: '72 tiles, two towers', map: [
      ['# # #                   # # #', '', '# # #     # # # # #     # # #', '', '# # #   # # # # # # #   # # #', '', '# # # # # # # # # # # # # # #', '', '      # # # # # # # # #'],
      ['', ' # #                     # #', '', ' # #                     # #', '', ' # #                     # #'],
      ['', '', '  #                       #', '', '  #                       #'],
      ['', '', '', '  #                       #']] },
    cat: { name: 'Cat', note: '68 tiles, with ears', map: [
      ['  #                 #', '', '    #             #', '', '      # # # # # # #', '', '    # # # # # # # # #', '', '    # # # # # # # # #', '', '    # # # # # # # # #', '',
       '      # # # # # # #', '', '            #'],
      ['', '', '', '', '', '', '        # # # # #', '', '        # # # # #', '', '        # # # # #'],
      ['', '', '', '', '', '', '', '          # # #', '', '          # # #'],
      ['', '', '', '', '', '', '', '', '            #']] },
    dragon: { name: 'Dragon', note: '88 tiles, winding', map: [
      ['      # # # # # # # # #', '', '  # # # # # # # # # # # # #', '', '# # # #               # # # #', '', '# # #', '', '  # # # # # # # # # # # #', '',
       '      # # # # # # # # # # # #', '', '                        # # #', '', '# # # #               # # # #'],
      ['', '', '      # # # # # # # # #', '', '', '', '', '', '', '', '        # # # # # # # # #'],
      ['', '', '             #', '', '', '', '', '', '', '', '               #']] },
    tree: { name: 'Tree', note: '86 tiles, four layers', map: [
      ['             #', '', '           # # #', '', '         # # # # #', '', '       # # # # # # #', '', '     # # # # # # # # #', '', '   # # # # # # # # # # #', '',
       ' # # # # # # # # # # # # #', '', '            # #'],
      ['', '', '', '', '             #', '', '           # # #', '', '         # # # # #', '', '       # # # # # # #', '', '     # # # # # # # # #'],
      ['', '', '', '', '             #', '', '', '', '', '', '           # # #', '', '         # # # # #'],
      ['', '', '', '', '             #']] },
    pumpkin: { name: 'Pumpkin', note: '92 tiles, round', map: [
      ['             #', '', '       # # # # # # #', '', '     # # # # # # # # #', '', '   # # # # # # # # # # #', '', '   # # # # # # # # # # #', '',
       '     # # # # # # # # #', '', '       # # # # # # #'],
      ['', '', '', '', '         # # # # #', '', '       # # # # # # #', '', '       # # # # # # #', '', '         # # # # #'],
      ['', '', '', '', '', '           # # #', '', '         # # # # #', '', '           # # #'],
      ['', '', '', '', '', '', '            # #']] },
    turkey: { name: 'Turkey', note: '86 tiles, fan tail', map: [
      ['          # # # # #', '', '      # # # # # # # # #', '', '    # # # # # # # # # # #', '', '        # # # # # # #', '                          #', '      # # # # # # # # #',
       '                        #', '      # # # # # # # # #', '', '        # # # # # # #', '', '          #       #'],
      ['', '', '          # # # # #', '', '        # # # # # # #', '', '', '', '          # # # # #', '', '          # # # # #'],
      ['', '', '', '', '', '', '', '', '', '            # # #']] },
    leaf: { name: 'Leaf', note: '60 tiles, autumn', map: [
      ['             #', '', '           # # #', '', ' # #     # # # # #     # #', '', '   # # # # # # # # # # #', '', '     # # # # # # # # #', '', '       # # # # # # #', '', '           # # #', '', '             #', '', '             #'],
      ['', '', '', '', '', '', '         # # # # #', '', '         # # # # #', '', '           # # #'],
      ['', '', '', '', '', '', '', '            # #']] },
    snowman: { name: 'Snowman', note: '78 tiles, three balls', map: [
      ['           # # #', '', '         # # # # #', '', '           # # #', '', ' #       # # # # #       #', '   #                   #', '       # # # # # # #', '', '         # # # # #', '', '       # # # # # # #', '', '     # # # # # # # # #', '', '       # # # # # # #'],
      ['', '            # #', '', '', '', '', '', '          # # # #', '', '            # #', '', '', '', '        # # # # # #', '', '        # # # # # #'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '           # # #']] },
    snowflake: { name: 'Snowflake', note: '58 tiles, eight arms', map: [
      ['    #     # # # #     #', '', '      #     # #     #', '', '        #   # #   #', '#                         #', '          # # # #', '# # # # #         # # # # #', '          # # # #', '#                         #', '        #   # #   #', '', '      #     # #     #', '', '    #     # # # #     #'],
      ['', '', '', '', '', '', '           # # #', '', '           # # #'],
      ['', '', '', '', '', '', '', '            # #']] }
  };

  function expand(layout) {
    var out = [];
    if (layout.map) {
      layout.map.forEach(function (rows, z) {
        rows.forEach(function (row, y) {
          for (var x = 0; x < row.length; x++) if (row.charAt(x) === '#') out.push({ x: x, y: y, z: z });
        });
      });
      return out;
    }
    layout.runs.forEach(function (r) {
      for (var i = 0; i < r[3]; i++) out.push({ x: r[2] + 2 * i, y: r[1], z: r[0] });
    });
    layout.singles.forEach(function (s) { out.push({ x: s[0], y: s[1], z: s[2] }); });
    return out;
  }

  function key(x, y, z) { return (x + 4) + (y + 4) * 64 + z * 4096; }

  function buildIndex(pos) {
    var m = new Map();
    pos.forEach(function (p, i) { m.set(key(p.x, p.y, p.z), i); });
    return m;
  }

  function isFree(i, pos, idx, present) {
    var p = pos[i], dx, dy, j;
    for (dx = -1; dx <= 1; dx++) {
      for (dy = -1; dy <= 1; dy++) {
        j = idx.get(key(p.x + dx, p.y + dy, p.z + 1));
        if (j !== undefined && present[j]) return false;
      }
    }
    var left = false, right = false;
    for (dy = -1; dy <= 1; dy++) {
      j = idx.get(key(p.x - 2, p.y + dy, p.z));
      if (j !== undefined && present[j]) left = true;
      j = idx.get(key(p.x + 2, p.y + dy, p.z));
      if (j !== undefined && present[j]) right = true;
    }
    return !(left && right);
  }

  function freeList(pos, idx, present) {
    var out = [];
    for (var i = 0; i < pos.length; i++) if (present[i] && isFree(i, pos, idx, present)) out.push(i);
    return out;
  }

  function matchKey(face) { return face < 34 ? face : (face < 38 ? 34 : 35); }

  function seeded(seed) {
    var t = seed >>> 0;
    return function () {
      t = (t + 0x6D2B79F5) >>> 0;
      var r = Math.imul(t ^ (t >>> 15), 1 | t);
      r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(a, rnd) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function fullPairs(rnd) {
    var pairs = [], f;
    for (f = 0; f < 34; f++) { pairs.push([f, f]); pairs.push([f, f]); }
    var fl = shuffle([34, 35, 36, 37], rnd), se = shuffle([38, 39, 40, 41], rnd);
    pairs.push([fl[0], fl[1]], [fl[2], fl[3]], [se[0], se[1]], [se[2], se[3]]);
    return pairs;
  }

  function deal(pos, idx, present0, pairs, rnd) {
    for (var attempt = 0; attempt < 400; attempt++) {
      var present = present0.slice(), faces = [], ok = true;
      var order = shuffle(pairs.slice(), rnd);
      for (var k = 0; k < order.length; k++) {
        var free = freeList(pos, idx, present);
        if (free.length < 2) { ok = false; break; }
        var ai = Math.floor(rnd() * free.length), a = free[ai];
        free.splice(ai, 1);
        var b = free[Math.floor(rnd() * free.length)];
        faces[a] = order[k][0]; faces[b] = order[k][1];
        present[a] = 0; present[b] = 0;
      }
      if (ok) return faces;
    }
    return null;
  }

  function newDeal(layoutId, rnd) {
    rnd = rnd || Math.random;
    var pos = expand(LAYOUTS[layoutId]), idx = buildIndex(pos);
    var present = pos.map(function () { return 1; });
    var all = fullPairs(rnd), bonus = all.slice(68), suits = shuffle(all.slice(0, 68), rnd);
    var pairs = pos.length >= 16 ? bonus.concat(suits).slice(0, pos.length / 2) : suits.slice(0, pos.length / 2);
    var faces = deal(pos, idx, present, pairs, rnd);
    if (!faces) {
      var flat = [];
      pairs.forEach(function (p) { flat.push(p[0], p[1]); });
      faces = shuffle(flat, rnd);
    }
    return faces;
  }

  function redeal(pos, idx, present, faces, rnd) {
    rnd = rnd || Math.random;
    var groups = {}, i;
    for (i = 0; i < pos.length; i++) {
      if (!present[i]) continue;
      var k = matchKey(faces[i]);
      (groups[k] = groups[k] || []).push(faces[i]);
    }
    var pairs = [];
    Object.keys(groups).forEach(function (k) {
      var g = shuffle(groups[k], rnd);
      for (var n = 0; n + 1 < g.length; n += 2) pairs.push([g[n], g[n + 1]]);
    });
    var dealt = deal(pos, idx, present, pairs, rnd);
    if (!dealt) return null;
    var out = faces.slice();
    for (i = 0; i < pos.length; i++) if (present[i]) out[i] = dealt[i];
    return out;
  }

  function openPairs(pos, idx, present, faces) {
    var free = freeList(pos, idx, present), by = {}, out = [];
    free.forEach(function (i) { var k = matchKey(faces[i]); (by[k] = by[k] || []).push(i); });
    Object.keys(by).forEach(function (k) {
      var g = by[k];
      for (var a = 0; a < g.length; a++) for (var b = a + 1; b < g.length; b++) out.push([g[a], g[b]]);
    });
    return out;
  }

  root.MBEngine = {
    LAYOUTS: LAYOUTS, expand: expand, buildIndex: buildIndex, isFree: isFree, freeList: freeList,
    matchKey: matchKey, newDeal: newDeal, seeded: seeded, redeal: redeal, openPairs: openPairs, deal: deal, fullPairs: fullPairs
  };
})(typeof window !== 'undefined' ? window : this);

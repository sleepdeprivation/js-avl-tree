/**
 * This example shows how to use the sigma.plugins.animate plugin. It
 * creates a random graph with two different views:
 *
 * The circular view displays the nodes on a circle, with each node
 * having a random color and a random size.
 *
 * The grid view displays every nodes with the same size, and on a grid.
 *
 * Every two seconds, the graph will be animated from a view to the other
 * one, in a one second animation.
 */
var i,
    s,
    o,
    L = 10,
    N = 100,
    E = 500,
    g = {
      nodes: [],
      edges: []
    },
    step = 0;

// Generate a random graph:
for (i = 0; i < N; i++) {
  o = {
    id: 'n' + i,
    label: 'Node ' + i,
    circular_x: L * Math.cos(Math.PI * 2 * i / N - Math.PI / 2),
    circular_y: L * Math.sin(Math.PI * 2 * i / N - Math.PI / 2),
    circular_size: Math.random(),
    circular_color: '#' + (
      Math.floor(Math.random() * 16777215).toString(16) + '000000'
    ).substr(0, 6),
    grid_x: i % L,
    grid_y: Math.floor(i / L),
    grid_size: 1,
    grid_color: '#ccc'
  };

  ['x', 'y', 'size', 'color'].forEach(function(val) {
    o[val] = o['grid_' + val];
  });

  g.nodes.push(o);
}

for (i = 0; i < E; i++)
  g.edges.push({
    id: 'e' + i,
    source: 'n' + (Math.random() * N | 0),
    target: 'n' + (Math.random() * N | 0)
  });

// Instantiate sigma:
s = new sigma({
  graph: g,
  container: 'graph-container',
  settings: {
    animationsTime: 1000
  }
});

setInterval(function() {
  var prefix = ['grid_', 'circular_'][step = +!step];
  sigma.plugins.animate(
    s,
    {
      x: prefix + 'x',
      y: prefix + 'y',
      size: prefix + 'size',
      color: prefix + 'color'
    }
  );
}, 2000);

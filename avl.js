

	function max(arg1, arg2){
		return Number((arg1 > arg2) ? arg1 : arg2);
	}


	function binaryTree(){

		this.element = null;
		this.left = null;
		this.right = null;

		this.height = -1;

		this.visitor = null;


		this.copyTo = function(dest){
			dest.element = this.element;
			dest.left = this.left;
			dest.right = this.right;
			dest.height = this.height;
			dest.visitor = this.visitor;
		}

		this.copyOf = function(src){
			if(src != null){
				this.element = src.element;
				this.left = src.left;
				this.right = src.right;
				this.height = src.height;
				this.visitor = src.visitor;
			}else{
				delete this;
			}
		}

		this.setRight = function(src){
			if(this.right == null){
				this.right = new binaryTree();
			}
			this.right.copyOf(src);
		}

		this.setLeft = function(src){
			if(this.left == null){
				this.left = new binaryTree();
			}
			this.left.copyOf(src);
		}

		this.getHeight = function(node){
			if(node != null){
				return Number(node.height);
			}else{
				return -1;
			}
		}



		this.insert = function(x){
			if(this.element == null){
				this.element = x;
			}else if(x < this.element){
				if(this.left == null){
					this.left = new binaryTree();
				}
				this.left.insert(x);
				if((this.getHeight(this.left) - this.getHeight(this.right)) == 2){
					if(x < this.left.element){
						this.Lrotate(this);
					}
					else{
						this.LLrotate();
					}
				}
			}else if(x > this.element){
				if(this.right == null){
					this.right = new binaryTree();
				}
				this.right.insert(x);
				if((this.getHeight(this.right) - this.getHeight(this.left)) == 2){
					if(x > this.right.element){
						this.Rrotate(this);
					}
					else{
						this.RRrotate();
					}
				}
			}else{
				//duplicate
			}
			this.height = max(this.getHeight(this.left), this.getHeight(this.right) ) + 1;
		}




		this.Lrotate = function(){

			//collect the root node's constituents
			R = this.right;
			temp = this.left;
			rootElement = this.element;
			//collect the (left child of the root node)'s constituents
			z = temp.element;
			r1 = temp.right;
			l1 = temp.left;
			//shuffle stuff around in AVL fashion
			//put the root stuff into temp
			temp.element = rootElement;
			temp.left = r1;
			temp.right = R;
			//make the root look like temp
			this.element = z;
			this.right = temp;
			this.left = l1;

			temp.height = max(this.getHeight(temp.left), this.getHeight(temp.right)) + 1;
			this.height - max(this.getHeight(this.left), temp.height) + 1;

			

		}

		this.Rrotate = function(){

			//collect the root node's constituents
			L = this.left;
			temp = this.right;
			rootElement = this.element;
			//collect the (left child of the root node)'s constituents
			z = temp.element;
			r1 = temp.right;
			l1 = temp.left;
			//shuffle stuff around in AVL fashion
			//first put the root stuff into temp
			temp.element = rootElement;
			temp.right = l1;
			temp.left = L;	
			//now make the root look like temp did
			this.element = z;
			this.left = temp;
			this.right = r1;

			temp.height = max(this.getHeight(temp.left), this.getHeight(temp.right)) + 1;
			this.height - max(this.getHeight(this.right), temp.height) + 1;
			

		}

		this.LLrotate = function(){
			this.left.Rrotate();
			this.Lrotate();
		}

		this.RRrotate = function(){
			this.right.Lrotate();
			this.Rrotate();
		}

		this.print = function(){
			if(this.element != null){
				if(this.left != null){
					this.left.print();
				}
				console.log(this.element);
				if(this.right != null){
					this.right.print()
				}
			}
		}
		this.printSearch = function(){
			if(this.element != null){
				console.log("height: "+this.getHeight(this));
				console.log(this.element);
				if(this.left != null){
					this.left.printSearch();
				}
				if(this.right != null){
					this.right.printSearch()
				}
			}
		}


		this.constructGraph = function(g, width, depth){
			if(this.element != null){
				g.nodes.push( {"id": String(this.element), "label": String(this.element), x: width, y: depth*100, "size":"5.5","color":"rgb(1,179,255)"});
				if(this.left != null){
					this.left.constructGraph(g, width-(width/2), depth+1);
					g.edges.push({"id": String(this.element) + "l", "source": String(this.element), "target": String(this.left.element)});
				}
				if(this.right != null){
					this.right.constructGraph(g, width+(width/2), depth+1);
					g.edges.push({"id": String(this.element) + "r", "source": String(this.element), "target": String(this.right.element)});
				}
			}
		}
}



	//console.log(max(4, 6));

	tree = new binaryTree();

	for(var ii = 0; ii < 7; ii++){
		tree.insert(ii);
	}

	var holder = new Object();

	holder.nodes = [];
	holder.edges = [];

	tree.constructGraph(holder, 150, 1);
	g = {"nodes": holder.nodes, "edges": holder.edges};
	
	// Instantiate sigma:
	s = new sigma({
	  graph: g,
	  container: 'graph-container',
	  settings: {
	    animationsTime: 1000
	  }
	});

	setInterval(function() {
	  sigma.plugins.animate(
	    s,
	    {
	    }
	  );
	}, 2000);


	//tree.Rrotate();
	//tree.Rrotate();


	tree.printSearch();



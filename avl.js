

	function binaryTree(){

		this.element = null;
		this.left = null;
		this.right = null;

		this.height = 0;

		this.visitor = null;


		this.copyTo(dest){
			dest.element = this.element;
			dest.left = this.left;
			dest.right = this.right;
			dest.height = this.height;
			dest.visitor = this.visitor;
		}

		this.insert = function(x){
			if(this.element == null){
				this.element = x;
			}else if(x < this.element){
				if(this.left == null){
					this.left = new binaryTree();
				}
				this.left.insert(x);
			}else if(x > this.element){
				if(this.right == null){
					this.right = new binaryTree();
				}
				this.right.insert(x);
			}else{
				//duplicate
			}
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
			this.element = z;
			this.right = temp;
			this.left = l1;

			temp.element = rootElement;
			temp.left = r1;
			temp.right = R;		
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
				console.log(this.element);
				if(this.left != null){
					this.left.printSearch();
				}
				if(this.right != null){
					this.right.printSearch()
				}
			}
		}
}


	tree = new binaryTree();

	tree.insert(7);
	tree.insert(2);
	tree.insert(10);
	tree.insert(4);
	tree.insert(1);

	tree.Lrotate();

	tree.printSearch();



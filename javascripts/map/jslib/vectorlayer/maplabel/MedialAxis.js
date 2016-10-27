
Atlas.MedialAxis = Atlas.Class.extend({

    initialize: function (points) {
    	
    	if(!points){return;}
    	
    	var list = null;
    	if(points.length > 0){
    		list = new Atlas.PointList(points[0].x,points[0].y);
    		for(var i = 1,len = points.length;i< len;i++){
    			list.AddLast(points[i].x,points[i].y);
        	}
    	}
    	
    	this.BIG_NUMBER = 9999.0;
    	this.SMALL_NUMBER = 0.000001;
    	
    	this.Poly = list.GetPolygon();// this is the polygon generated by the user
    	this.A=[],this.B = [],this.C = [];		// these are the arrays of A B and C respectively
    								// in the equation AX+BY+C=0 that we make from each
    								// calculated polygon edge.
    	this.M = [];			// the SHIPUA of the line
    	
    	this.LastWasPoint = -1;

		for (var j = 1; j < this.Poly.npoints; j++)
		{
			this.A[i-1] = this.Poly.ypoints[i-1]-this.Poly.ypoints[i];
			this.B[i-1] = this.Poly.xpoints[i]-this.Poly.xpoints[i-1];
			this.C[i-1] = this.Poly.ypoints[i]*this.Poly.xpoints[i-1] -
			            this.Poly.xpoints[i]*this.Poly.ypoints[i-1];
			this.M[i-1] = (0.0+this.Poly.ypoints[i]-this.Poly.ypoints[i-1])/
					 (0.0+this.Poly.xpoints[i]-this.Poly.xpoints[i-1]+this.SMALL_NUMBER);
		}
		
		this.A[this.Poly.npoints-1] = this.Poly.ypoints[this.Poly.npoints-1]-this.Poly.ypoints[0];
		this.B[this.Poly.npoints-1] = this.Poly.xpoints[0]-this.Poly.xpoints[this.Poly.npoints-1];
		this.C[this.Poly.npoints-1] = this.Poly.ypoints[0]*this.Poly.xpoints[this.Poly.npoints-1] -
		                  this.Poly.xpoints[0]*this.Poly.ypoints[this.Poly.npoints-1];
		this.M[this.Poly.npoints-1] = (0.0+this.Poly.ypoints[0]-this.Poly.ypoints[this.Poly.npoints-1])/
							(0.0+this.Poly.xpoints[0]-this.Poly.xpoints[this.Poly.npoints-1]+this.SMALL_NUMBER);
		
		
    },

    getMedialAxisPoints:function(){
    	
    	var MinDistance,Dist=-1,LastDist,FirstDist=-1,
		    edge,times,LastWasPoint2,FirstWasPoint=-1,
		    bound,points = [];
		
    	bound =this.Poly.getBound();
    	
    	for (var j = bound.min.y; j < bound.max.y; j++)
			for (var i = bound.min.x; i < bound.max.x; i++)
				if (this.Poly.containsPoint(new Atlas.Point(i,j)))
				{
                    ///graphics.setColor(Color.green);
					//graphics.drawOval(i,j,1,1);
					
					MinDistance = this.BIG_NUMBER;
					times = -1;
					this.LastWasPoint = -1;
					for (edge = 0; edge < this.Poly.npoints; edge++)
					{
						LastWasPoint2 = this.LastWasPoint;
						LastDist = Dist;
						
						Dist = this.EdgeDistance(i,j,edge);
						
						if (edge == 0)
						{	// Save for the last edge checks
							FirstDist = Dist;
							FirstWasPoint = this.LastWasPoint;
						}
						
						if (Math.abs(Dist-LastDist)<1 && (
							(LastWasPoint2 > -1 && this.LastWasPoint > -1) ||
							(this.LastWasPoint == edge  && LastWasPoint2 == -1) ||
							(this.LastWasPoint == -1 && LastWasPoint2 == edge) ))
							Dist = this.BIG_NUMBER;
						
						if (edge == this.Poly.npoints - 1)
						{
							if (Math.abs(Dist-FirstDist)<1 && (
								(FirstWasPoint > -1 && this.LastWasPoint > -1) ||
								(this.LastWasPoint == 0  && FirstWasPoint == -1) ||
								(this.LastWasPoint == -1 && FirstWasPoint == 0) ))
								Dist = this.BIG_NUMBER;
						}
						
						if (Math.abs(Dist-MinDistance) < 1)
						{
							times++;
						}
						else if (Dist < MinDistance)
						{
							times = 0;
							MinDistance = Dist;
						}
					}
					
					if (times == 2 && MinDistance != this.BIG_NUMBER)
					{
						
						points.push(new Atlas.Point(i,j));
						
					}
						
				}
    	
    	return points;
    	
    },
    
	//---------------------------------------------------------------------------------
	// These are medial's private functions, dealing only with calculating distances
	//---------------------------------------------------------------------------------
	// The distance between the point (x,y) to the edge
	Distance: function(x,y,edge)
	{
		return Math.abs( (0.0+this.A[edge]*x+this.B[edge]*y+this.C[edge])/
						 (0.0+Math.sqrt(0.0+this.A[edge]*this.A[edge]+this.B[edge]*this.B[edge])) );
	},
	//---------------------------------------------------------------------------------
	// The distance between the point (x,y) to the first point in the edge
	PointDistance: function(x,y,edge)
	{
		return Math.abs( Math.sqrt(0.0+(this.Poly.xpoints[edge]-x)*(this.Poly.xpoints[edge]-x)+
									   (this.Poly.ypoints[edge]-y)*(this.Poly.ypoints[edge]-y)) );
	},
	//---------------------------------------------------------------------------------
	// The distance between the point (x,y) to the segment of the edge
	// this means that if the point is not "above" the segment the distance
	// is actually the distance to one of the ends of the segment
	EdgeDistance: function(x,y,edge)
	{
		var nextEdge;
		if (edge < this.Poly.npoints - 1)
			nextEdge = edge + 1;
		else
			nextEdge = 0;

		// Check if the point (x,y) is "above" the segment (if it creates a
		// triangle with no angles of more than 90 degrees)
		// I'll do this by checking if the X point of the intersection between
		// the edge and the ANACH that starts at (x,y) is between the edge's Xs
		
		var interX;
		if (Math.abs(this.M[edge]) <= 0.1)
			interX = x;
		else
			interX = ((1.0*y + 1.0*x/this.M[edge]) - (1.0*this.Poly.ypoints[edge] - this.M[edge]*this.Poly.xpoints[edge]))/
					 (this.M[edge] + 1.0/this.M[edge]);
				
		if ( (interX >= this.Poly.xpoints[edge] && interX <= this.Poly.xpoints[nextEdge]) ||
			 (interX <= this.Poly.xpoints[edge] && interX >= this.Poly.xpoints[nextEdge]) )
		{
			this.LastWasPoint = -1;
			return this.Distance(x,y,edge);
		}
		
		// Now also checkthe Y (but only if M, the SHIPUA, is BIG so that we might had
		// a problem)
		if (Math.abs(this.M[edge]) >= this.BIG_NUMBER)
			if ( (y >= this.Poly.ypoints[edge] && y <= this.Poly.ypoints[nextEdge]) ||
				 (y <= this.Poly.ypoints[edge] && y >= this.Poly.ypoints[nextEdge]) )
			{
				this.LastWasPoint = -1;
				return this.Distance(x,y,edge);
			}
		
		// since it isn't between we return the distance to the edges
		var far1,far2;
		far1 = this.PointDistance(x,y,edge);
		far2 = this.PointDistance(x,y,nextEdge);
		if (far1 < far2)
		{
			this.LastWasPoint = edge;
			return far1;
		}
		this.LastWasPoint = nextEdge;
		return far2;
	}
	//---------------------------------------------------------------------------------

});


   


	(function(){
		$.fn.genClips = function(options){
			var defaults = {
				amount:10,
				ClipsnName:"body",
				callBack:function(){}
			};
			var obj = $.extend(true,defaults,options);
			
			var $this = this,
				$container = $this.find('.genClips-container');
		
			// 检查动画何时大部分结束
			var stopSum = 0,clicked = false,first = false;;

			// 随机数的快速随机函数
			function rand(min, max) {
				
				return Math.floor(Math.random() * (max - min + 1)) + min;
				
			}
			genClips();
			
			function genClips() {
				
				
				var width = $this.width() / obj.amount;
				var height = $this.height() / obj.amount;
				
				// 总数是总数的平方
				var totalSquares = Math.pow(obj.amount, 2);
				
				var html = $container.html();
				
				var y = 0;
				
				for(var z = 0; z <= (obj.amount*width); z = z+width) { 
				
					$('<div class="clipped" style="clip: rect('+y+'px, '+(z+width)+'px, '+(y+height)+'px, '+z+'px)">'+html+'</div>').appendTo($this);
					$(".clipped").css({
						"width": $this.width(),
						"height": $this.height(),
						"position": "absolute",
						"top": "auto",
						"left": 0,
					})
					
					if(z === (obj.amount*width)-width) {
					
						y = y + height;
						z = -width;
					
					}
					
					if(y === (obj.amount*height)) {
						z = 9999999;
					}
					
				}
				$container.hide()
				
			};
			function doDown() {
				
				if(!clicked&&!first) {
					first = true;
					clicked = true;
					$container.hide().siblings().each(function() {

						var self = $(this);

						// 速度是90m/s到120m/s之间的随机速度
						var v = rand(120, 90),
							angle = rand(80, 89), // 投影的角度是一个介于80到89度之间的随机数。
							theta = (angle * Math.PI) / 180, // 弧度
							g = -9.8; // 重力是-9.8。
							
						
						
						// 时间初始为零，也设置了一些随机变量。它比抛物运动的总时间要长,因为我们想让方块离开屏幕。
						var t = 0,
							z, r, nx, ny,
							totalt =  15;
						
						// 方向可以是左(1)右(-1)或中心(0)，这是水平方向。
						var negate = [1, -1, 0],
							direction = negate[ Math.floor(Math.random() * negate.length) ];
						
						// 一些用来改变形状位置的随机数
						var randDeg = rand(-5, 10), randScale = rand(0.9, 1.1),randDeg2 = rand(30, 5);
						
						
						var color = $(this).css('backgroundColor').split('rgb(')[1].split(')')[0].split(', '),
							colorR = rand(-20, 20),  // 如果要更改颜色，可能需要手动更改这些参数
							colorGB = rand(-20, 20), 
							newColor = 'rgb('+(parseFloat(color[0])+colorR)+', '+(parseFloat(color[1])+colorGB)+', '+(parseFloat(color[2])+colorGB)+')';
						
						
						$(this).css({
							'transform' : 'scale('+randScale+') skew('+randDeg+'deg) rotateZ('+randDeg2+'deg)', 
							'background' : newColor
						});


						//每隔10ms运行此间隔。改变这个会改变动画的节奏
						var z = setInterval(function() { 	
							
							// 水平速度恒定(互联网无风阻)
							var ux = ( Math.cos(theta) * v ) * direction;
							
							// 垂直速度随着时间的增加而减小，直到达到峰值0
							var uy = ( Math.sin(theta) * v ) - ( (-g) * t);
							
							// 水平位置
							nx = (ux * t);
									
							// s = ut + 0.5at^2
							ny = (uy * t) + (0.5 * (g) * Math.pow(t, 2));
							
							$(self).css({'bottom' : (ny)+'px', 'left' : (nx)+'px'});
							
							// Increase the time by 0.10
							t = t + 0.10;
							
							// 如果时间大于总时间，则清除计时器
							if(t > totalt) {
								
								clicked = false;
								first = true;
								$this.css({'top' : '-1000px', 'transition' : 'none'});
								$(self).css({'left' : '0', 'bottom' : '0', 'opacity' : '1', 'transition' : 'none', 'transform' : 'none'});
								stopSum++;
								if(obj.amount * obj.amount === stopSum){
									obj.callBack&&obj.callBack()
									
								}
								clearInterval(z);
							}
							
						}, 10);
				
					});
					
				}
			
			};
			
			$(obj.ClipsnName).on('click', function(){
				doDown()
			});
		}
	}())

	

	
				
		

	


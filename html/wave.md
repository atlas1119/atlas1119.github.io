# IOS波纹动画实现方法

* 波浪动画：公式：y=Asin(ωx+φ)+k        y=Acos(ωx+φ)+k

其中 A为振幅
k为偏距 ， 反映在坐标系上则为图像的上移或下移；
ω为角速度， 控制正弦周期(也就是在单位角度内震动的次数)；
φ为初相， 就是反映在坐标系上则为图像的左右移动；


主要原理是：

绘制 两条线，一条是正玄曲线，一条是余玄曲线； 交错的展示，形成波纹；
随着波浪位移的增加，波纹不断的上涨，造成水深的上涨；

绘制正玄：

    -(void)setCurrentFirstWaveLayerPath{

        CGMutablePathRef path = CGPathCreateMutable();
        CGFloat y = currentWavePointY;
        CGPathMoveToPoint(path, nil, 0, y);
        for (float x = 0.0f; x <=  waterWaveWidth ; x++) {
            // 正弦波浪公式
            y = waveAmplitude * sin(waveCycle * x + offsetX) + currentWavePointY;
            CGPathAddLineToPoint(path, nil, x, y);
        }

        CGPathAddLineToPoint(path, nil, waterWaveWidth, self.frame.size.height);
        CGPathAddLineToPoint(path, nil, 0, self.frame.size.height);
        CGPathCloseSubpath(path);

        _firstWaveLayer.path = path;
        CGPathRelease(path);
    }

绘制余玄：

    -(void)setCurrentSecondWaveLayerPath{

        CGMutablePathRef path = CGPathCreateMutable();
        CGFloat y = currentWavePointY;
        CGPathMoveToPoint(path, nil, 0, y);
        for (float x = 0.0f; x <=  waterWaveWidth ; x++) {
            // 余弦波浪公式
            y = waveAmplitude * cos(waveCycle * x + offsetX) + currentWavePointY;
            CGPathAddLineToPoint(path, nil, x, y);
        }

        CGPathAddLineToPoint(path, nil, waterWaveWidth, self.frame.size.height);
        CGPathAddLineToPoint(path, nil, 0, self.frame.size.height);
        CGPathCloseSubpath(path);

        _secondWaveLayer.path = path;
        CGPathRelease(path);
    }

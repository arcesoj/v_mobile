//
//  RNGTextField.h
//  taochemao
//
//  Created by Eafy on 2018/7/31.
//  Copyright © 2018年 emao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTView.h>

@interface VTextInput : UITextField

@property (nonatomic, copy, nullable) RCTBubblingEventBlock onChange;

@end

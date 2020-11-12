//
//  VTextInput.m
//  v_challenge
//
//  Created by Jose Arce on 8/11/20.
//
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "VTextInput.h"
#import <React/RCTViewManager.h>

@interface VTextInputManager : RCTViewManager
@end

@implementation VTextInputManager

RCT_EXPORT_MODULE(VTextInput)
RCT_EXPORT_VIEW_PROPERTY(placeholder, NSString)
RCT_CUSTOM_VIEW_PROPERTY(onChange, RCTBubblingEventBlock, UITextField){
  
}

RCT_CUSTOM_VIEW_PROPERTY(value, NSString, UITextField){
  NSNumberFormatter *formatter = [[NSNumberFormatter alloc] init];
  [formatter setNumberStyle:NSNumberFormatterCurrencyStyle];
  int x = [json intValue];
  NSNumber *number = [NSNumber numberWithInt: x];
  NSString *priceString = [formatter stringFromNumber:number];
  [view setText:priceString];
}

- (UIView *) view
{
  UITextField *textField = [[UITextField alloc] initWithFrame:CGRectMake(10, 200, 300, 40)];
  textField.borderStyle = UITextBorderStyleRoundedRect;
  textField.font = [UIFont systemFontOfSize:15];
  textField.layer.cornerRadius = 0;
  textField.enabled = NO;
  return textField;
}

@end

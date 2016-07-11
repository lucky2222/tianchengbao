package com.tcb.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.ElementType;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Inherited
public @interface CheckLogin {
	String menucode() default "";
	String functioncode() default "";
	String datacode() default "";
	String title() default "";
	boolean mustLogin() default true;
}

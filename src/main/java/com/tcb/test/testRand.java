package com.tcb.test;

import java.util.Random;

public class testRand {

	public static void main(String[] args) {
		Random rand = new Random();
		for(int i=0;i<100;i++)
		System.out.println((int) (rand.nextFloat()*1000));
	}

}

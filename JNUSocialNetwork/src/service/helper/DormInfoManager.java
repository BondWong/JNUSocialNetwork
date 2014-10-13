package service.helper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DormInfoManager {
	private static Map<String, List<String>> dormInfo;
	static{
		dormInfo = new HashMap<String, List<String>>();
		
		List<String> GuangzhouCampus = new ArrayList<String>();
		List<String> ZhuhaiCampus = new ArrayList<String>();
		List<String> HuawenCampus = new ArrayList<String>();
		List<String> ShenzhenCampus = new ArrayList<String>();
		
		GuangzhouCampus.add("学生宿舍一栋");
		GuangzhouCampus.add("真茹二栋");
		GuangzhouCampus.add("真茹三栋");
		GuangzhouCampus.add("真茹五栋");
		GuangzhouCampus.add("学生宿舍六栋");
		GuangzhouCampus.add("学生宿舍七栋");
		GuangzhouCampus.add("学生宿舍八栋");
		GuangzhouCampus.add("学生宿舍九栋");
		GuangzhouCampus.add("金陵四栋");
		GuangzhouCampus.add("金陵一栋");
		GuangzhouCampus.add("金陵三栋");
		GuangzhouCampus.add("建阳十四栋");
		GuangzhouCampus.add("建阳十五栋");
		GuangzhouCampus.add("建阳十六栋");
		GuangzhouCampus.add("建阳十七栋");
		GuangzhouCampus.add("建阳十八栋");
		GuangzhouCampus.add("建阳十九栋");
		GuangzhouCampus.add("建阳二十栋");
		GuangzhouCampus.add("周转A");
		GuangzhouCampus.add("周转B");
		GuangzhouCampus.add("周转C");
		
		ZhuhaiCampus.add("一栋");
		ZhuhaiCampus.add("二栋");
		ZhuhaiCampus.add("三栋");
		ZhuhaiCampus.add("四栋");
		ZhuhaiCampus.add("五栋");
		ZhuhaiCampus.add("六栋");
		ZhuhaiCampus.add("七栋");
		ZhuhaiCampus.add("八栋");
		ZhuhaiCampus.add("九栋");
		
		HuawenCampus.add("東一");
		HuawenCampus.add("東二");
		HuawenCampus.add("東三");
		HuawenCampus.add("信義");
		HuawenCampus.add("忠愛");
		HuawenCampus.add("敬慎");
		HuawenCampus.add("篤行");
		
		ShenzhenCampus.add("一栋");
		ShenzhenCampus.add("二栋");
		ShenzhenCampus.add("三栋");
		ShenzhenCampus.add("四栋");
		
		dormInfo.put("ZhuhaiCampus", ZhuhaiCampus);
		dormInfo.put("GuangzhouCampus", GuangzhouCampus);
		dormInfo.put("HuawenCampus", HuawenCampus);
		dormInfo.put("ShenzhenCampus", ShenzhenCampus);
		
	}
	
	public static List<String> getDormInfo(String campus){
		return dormInfo.get(campus);
	}
}

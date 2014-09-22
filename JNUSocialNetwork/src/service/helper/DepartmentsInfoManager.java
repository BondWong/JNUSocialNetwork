package service.helper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DepartmentsInfoManager {
	private static Map<Long, List<String>> departments = new HashMap<Long, List<String>>();
	static {
		List<String> department = new ArrayList<String>();
		department.add("人力资源部");
		department.add("体育部");
		department.add("信息编辑部");
		department.add("公关部");
		department.add("国际部");
		department.add("学术部");
		department.add("宣传部");
		department.add("心理服务部");
		department.add("文娱部");
		department.add("社会实践部");
		department.add("秘书处");
		department.add("组织部");

		departments.put(1411055191107l, department);
		department.clear();

		department.add("秘书部");
		department.add("公关部");
		department.add("人资部");
		department.add("学术部");
		department.add("组织部");
		department.add("体育部");
		department.add("宣传部");
		department.add("文娱部");
		department.add("编辑部");
		department.add("心理部");
		department.add("青年志愿者协会");

		// departments.put(1411055191107l, department);
		// department.clear();

		department.add("秘书处");
		department.add("公关部");
		department.add("心服部");
		department.add("文体部");
		department.add("编辑部");
		department.add("组织部");
		department.add("学术部");
		department.add("宣传部");

		departments.put(1411054407457l, department);
		department.clear();
	}

	public static List<String> get(Long communityID) {
		return departments.get(communityID);
	}
}

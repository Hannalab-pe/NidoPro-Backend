import { DataSource } from 'typeorm';
import { Role, Grade, Subject, Person, User } from '../../entities';
import * as bcrypt from 'bcrypt';

export async function seedInitialData(dataSource: DataSource) {
  console.log('🌱 Iniciando seeds...');

  // Repositorios
  const roleRepository = dataSource.getRepository(Role);
  const gradeRepository = dataSource.getRepository(Grade);
  const subjectRepository = dataSource.getRepository(Subject);
  const personRepository = dataSource.getRepository(Person);
  const userRepository = dataSource.getRepository(User);

  try {
    // 1. Insertar Roles
    console.log('📋 Creando roles...');
    const roles = [
      { name: 'admin', description: 'Administrador del sistema - acceso completo' },
      { name: 'director', description: 'Director del centro educativo - acceso completo' },
      { name: 'profesor', description: 'Profesor - gestiona cursos y estudiantes asignados' },
      { name: 'padre', description: 'Padre de familia - acceso a información de sus hijos' },
    ];

    for (const roleData of roles) {
      const existingRole = await roleRepository.findOne({ where: { name: roleData.name } });
      if (!existingRole) {
        const role = roleRepository.create(roleData);
        await roleRepository.save(role);
        console.log(`✅ Rol creado: ${roleData.name}`);
      } else {
        console.log(`⚠️  Rol ya existe: ${roleData.name}`);
      }
    }

    // 2. Insertar Grados
    console.log('🎓 Creando grados académicos...');
    const grades = [
      { name: 'Jardín 3 años', level: 'inicial', ageGroup: '3 años', description: 'Nivel inicial para niños de 3 años' },
      { name: 'Jardín 4 años', level: 'inicial', ageGroup: '4 años', description: 'Nivel inicial para niños de 4 años' },
      { name: 'Jardín 5 años', level: 'inicial', ageGroup: '5 años', description: 'Nivel inicial para niños de 5 años' },
      { name: '1° Primaria', level: 'primaria', ageGroup: '6 años', description: 'Primer grado de primaria' },
      { name: '2° Primaria', level: 'primaria', ageGroup: '7 años', description: 'Segundo grado de primaria' },
    ];

    for (const gradeData of grades) {
      const existingGrade = await gradeRepository.findOne({ where: { name: gradeData.name } });
      if (!existingGrade) {
        const grade = gradeRepository.create(gradeData);
        await gradeRepository.save(grade);
        console.log(`✅ Grado creado: ${gradeData.name}`);
      } else {
        console.log(`⚠️  Grado ya existe: ${gradeData.name}`);
      }
    }

    // 3. Insertar Materias
    console.log('📚 Creando materias...');
    const subjects = [
      { name: 'Matemática', code: 'MAT', description: 'Matemática básica y números' },
      { name: 'Comunicación', code: 'COM', description: 'Lenguaje y comunicación integral' },
      { name: 'Ciencia y Ambiente', code: 'CTA', description: 'Ciencias naturales y cuidado del ambiente' },
      { name: 'Personal Social', code: 'PS', description: 'Desarrollo personal y social' },
      { name: 'Inglés', code: 'ING', description: 'Idioma inglés básico' },
      { name: 'Educación Física', code: 'EF', description: 'Actividad física y deportes' },
      { name: 'Arte', code: 'ART', description: 'Educación artística y creatividad' },
      { name: 'Religión', code: 'REL', description: 'Educación religiosa y valores' },
      { name: 'Computación', code: 'COMP', description: 'Introducción a la tecnología' },
      { name: 'Psicomotricidad', code: 'PSICO', description: 'Desarrollo psicomotor' },
    ];

    for (const subjectData of subjects) {
      const existingSubject = await subjectRepository.findOne({ where: { code: subjectData.code } });
      if (!existingSubject) {
        const subject = subjectRepository.create(subjectData);
        await subjectRepository.save(subject);
        console.log(`✅ Materia creada: ${subjectData.name}`);
      } else {
        console.log(`⚠️  Materia ya existe: ${subjectData.name}`);
      }
    }

    // 4. Crear usuario administrador inicial
    console.log('👤 Creando usuario administrador...');
    const adminRole = await roleRepository.findOne({ where: { name: 'admin' } });
    
    if (adminRole) {
      const existingAdmin = await userRepository.findOne({ where: { username: 'admin' } });
      
      if (!existingAdmin) {
        // Crear persona para el admin
        const adminPerson = personRepository.create({
          firstName: 'Administrador',
          lastName: 'Sistema',
          documentType: 'DNI',
          documentNumber: '00000000',
          email: 'admin@nidopro.com',
          phone: '999999999',
        });
        await personRepository.save(adminPerson);

        // Crear usuario admin
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const adminUser = userRepository.create({
          personId: adminPerson.id,
          roleId: adminRole.id,
          username: 'admin',
          email: 'admin@nidopro.com',
          passwordHash: hashedPassword,
        });
        await userRepository.save(adminUser);
        
        console.log('✅ Usuario administrador creado');
        console.log('📧 Email: admin@nidopro.com');
        console.log('🔑 Usuario: admin');
        console.log('🔐 Contraseña: admin123');
      } else {
        console.log('⚠️  Usuario administrador ya existe');
      }
    }

    console.log('🎉 Seeds completados exitosamente!');
    
  } catch (error) {
    console.error('❌ Error en seeds:', error);
    throw error;
  }
}
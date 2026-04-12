import { useState } from 'react';
import PatientList from '../../domain/patient/components/   PatientList';
import type { Patient } from '../../domain/patient/types/patient.typs';
import Skeleton from '../../shared/components/ui/Skeleton';
import Input from '../../shared/components/ui/Input';
import Card from '../../shared/components/ui/Card';
import Button from '../../shared/components/ui/Button';
import {
  filterPatients,
  getPatientStatusSummary,
  groupPatientsByStatus,
} from '../../domain/patient/utils/patientMetrics';
import { usePatients } from '../../domain/patient/hooks/usePatients';


export default function PatientsPage() {
  const { patients, loading, error } = usePatients();
  const [search, setSearch] = useState('');
  const visiblePatients = filterPatients(patients, search);
  const summary = getPatientStatusSummary(visiblePatients);
  const groupedPatients = groupPatientsByStatus(visiblePatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  if (loading) return <Skeleton />;

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Failed to load patients.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className='space-y-1'>
        <h1 className="text-2xl font-semibold text-slate-950">Patients</h1>
        <p className="text-sm text-slate-500">
          Review patient status across the unit.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <p className="text-sm text-slate-500">Visible patients</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {summary.total}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-rose-600">Critical</p>
          <p className="mt-2 text-3xl font-bold text-rose-700">
            {summary.critical}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-amber-700">Monitoring</p>
          <p className="mt-2 text-3xl font-bold text-amber-700">
            {summary.monitoring}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-emerald-600">Stable</p>
          <p className="mt-2 text-3xl font-bold text-emerald-700">
            {summary.stable}
          </p>
        </Card>
      </div>

      <div className="max-w-md">
        <Input
          type="text"
          placeholder="Search patient, room, or diagnosis"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
      </div>

      {visiblePatients.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
          No patients matched your search.
        </div>
      )}

      {groupedPatients.critical.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold text-rose-600">
            Critical patients
          </h2>
          <PatientList
            patients={groupedPatients.critical}
            onPatientClick={setSelectedPatient}
          />
        </section>
      )}
      {groupedPatients.monitring.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold text-amber-600">
            Monitoring
          </h2>
          <PatientList
            patients={groupedPatients.monitring}
            onPatientClick={setSelectedPatient}
          />
        </section>
      )}

      {groupedPatients.satble.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold text-emerald-600">
            Stable
          </h2>
          <PatientList
            patients={groupedPatients.satble}
            onPatientClick={setSelectedPatient}
          />
        </section>
      )}
      
      {
        selectedPatient && (
          < Card 
          title='Patient Detail'
          actions = {
            <Button
              variant = "secondary"
              size = "sm"
              onClick={() => setSelectedPatient(null)}
              >
                Clear
            </Button>
          
          }
          >
            <div className='grid gap-4 md:grid-cols-2'>
              <div>
                <p className='text-sm text-slate-500 '>Name</p>
                <p className='mt-1 text-slate-900 text-lg font-semibold'>
                  {selectedPatient.name}
                </p>
              </div>

              <div>
                <p className=' text-sm text-slate-500'>Room</p>
                <p className='text-lg font-semibold text-slate-900'>
                  {selectedPatient.room}
                </p>
              </div>

            </div>
          </Card>
        )
      }
      
    </div>
  );
}

/**
 Container components handle data and logic, 
 while presentational components focus on rendering UI based on props. 
 This separation improves reusability and maintainability.

 *PatientsPage → smart (data + logic)
 PatientList / Row → dumb (فقط UI)
 data همیشه از بالا به پایین می‌آید
 */
